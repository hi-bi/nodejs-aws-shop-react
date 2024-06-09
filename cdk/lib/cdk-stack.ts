import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class ShopSiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const siteBucket = new s3.Bucket( this, "ShopSite-Bucket", {
      bucketName: "bv-eu-north-1-rss-221",
      websiteIndexDocument: "index.html",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    } )

    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, "ShopSite-OAI")

    siteBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ["S3:GetObject"],
      resources: [siteBucket.arnForObjects("*")],
      principals:[new iam.CanonicalUserPrincipal(cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
    }))

    const distribution = new cloudfront.CloudFrontWebDistribution(this, "ShopSite-Distribution", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: siteBucket,
            originAccessIdentity: cloudFrontOAI
          },
          behaviors : [ 
            {
              isDefaultBehavior: true
            }
          ]
        }
      ]
    })

    new s3deployment.BucketDeployment(this, "SiteShop-Bucket-Deployment", {
      sources: [s3deployment.Source.asset("../dist")],
      destinationBucket: siteBucket,
      distribution: distribution,
      distributionPaths: ["/*"]
    })


    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ShopSiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const cloudFrontOAI = new cdk.aws_cloudfront.OriginAccessIdentity(this, "ShopSite-OAI")

    const siteBucket = new cdk.aws_s3.Bucket( this, "ShopSite-Bucket", {
      bucketName: "bv-eu-north-1-rss-2",
      websiteIndexDocument: "index.html",
      publicReadAccess: false,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL
    } )

    siteBucket.addToResourcePolicy(new cdk.aws_iam.PolicyStatement({
      actions: ["S3:GetObject"],
      resources: [siteBucket.arnForObjects("*")],
      principals:[new cdk.aws_iam.CanonicalUserPrincipal(cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
    }))

    const distribution = new cdk.aws_cloudfront.CloudFrontWebDistribution(this, "ShopSite-Distribution", {
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

    new cdk.aws_s3_deployment.BucketDeployment(this, "SiteShop-Bucket-Deployment", {
      sources: [cdk.aws_s3_deployment.Source.asset("../dist")],
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

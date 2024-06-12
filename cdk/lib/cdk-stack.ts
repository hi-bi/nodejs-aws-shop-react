import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origin from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';
import { Construct, IConstruct } from 'constructs';
import { IPolicy } from 'aws-cdk-lib/aws-iam';

export class ShopSiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const appName = "ShopSite7"
    const appId = "227"

    const siteBucket = new s3.Bucket( this, `${appName}-Bucket`, {
      bucketName: `bv-eu-north-1-rss-${appId}`,
      websiteIndexDocument: "index.html",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    } )

    //const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, `${appName}-OAI`)

/*    
    const distribution = new cloudfront.CloudFrontWebDistribution(this, `${appName}-Distribution`, {
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
*/

    const distribution = new cloudfront.Distribution(this, `${appName}-Distribution`, {
      defaultBehavior: { 
        origin: new origin.S3Origin(siteBucket),
        //viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        
      },
      defaultRootObject: "index.html",
    });
    const cfnDistribution = distribution.node.defaultChild as cloudfront.CfnDistribution;

    const cfnOriginAccessControl = new cloudfront.CfnOriginAccessControl(this, `${appName}-OAC`, {
      originAccessControlConfig: {
        name: `oac-eu-north-1-rss-${appId}`,
        originAccessControlOriginType: 's3',
        signingBehavior: 'always',
        signingProtocol: 'sigv4',
    
        // the properties below are optional
        description: 'OAC to access the bucket',
      },
    })

    console.log('cfnOriginAccessControl.attrId: \n', cfnOriginAccessControl.getAtt('id'));



    const siteOACBucketPolicy = new iam.PolicyStatement({
      sid: 'AllowS3OACAccess',
      effect: iam.Effect.ALLOW,
      principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
      actions: ["s3:GetObject"],
      resources: [siteBucket.arnForObjects("*")],
      conditions: {
        StringEquals: {
          "AWS:SourceArn": `arn:aws:cloudfront::767397818606:distribution/${distribution.distributionId}`,
          //"AWS:SourceArn": `arn:aws:cloudfront::767397818606:distribution/${cfnOriginAccessControl.attrId}`,
        },
      },
    }) 

    siteBucket.addToResourcePolicy(siteOACBucketPolicy)

    //// clean-up the OAI reference and associate the OAC with the cloudfront distribution 
    // query the site bucket policy as a document
    const bucketPolicy = siteBucket.policy
    const bucketPolicyDocument = bucketPolicy?.document

    // remove the CloudFront Origin Access Identity permission from the bucket policy
      const Statement: Array<any> = [];
      const bucketPolicyUpdatedJson = {'Version': '2012-10-17', 'Statement': Statement}

    if (bucketPolicyDocument) {
      //console.log('bucketPolicyDocument: ', bucketPolicyDocument);
      //const bucketPolicyDocumentJson = JSON.parse(bucketPolicyDocument as unknown as string);
      const bucketPolicyDocumentJson = bucketPolicyDocument.toJSON() as {Statement: Array<any>, Version: string};

      //console.log('bucketPolicyDocumentJson: ', bucketPolicyDocumentJson);

      // create an updated policy without the OAI reference
      
      const statement = bucketPolicyDocumentJson.Statement
      //console.log('Statement: ', statement);
      for(let i = 0; i < statement.length; i++) {
        let principal = statement[i]?.Principal as { AWS: string };
        //console.log('principal: ', principal);
        if (!principal.AWS?.includes("Origin Access Identity")) {
          const el = statement[i]
          bucketPolicyUpdatedJson.Statement.push(el)

        }
      }
      
    }

    //console.log ('bucketPolicyUpdatedJson: ', bucketPolicyUpdatedJson);

    // apply the updated bucket policy to the bucket
    //console.log('siteBucket: ', siteBucket);
    const bucketPolicyOverride = siteBucket.node.findChild("Policy").node.defaultChild
    //console.log('siteBucket.Policy: ', bucketPolicyOverride);

//    bucketPolicyOverride?.node.setContext('Properties.PolicyDocument', bucketPolicyUpdatedJson)

    // remove the created OAI reference (S3 Origin property) for the distribution
    //console.log('distribution: ', distribution);
    const allDistributionProps = distribution.node.findAll()

    //console.log('allDistributionProps: ', allDistributionProps);

    //allDistributionProps.forEach(child => {
    //  if (child.node.id == 'S3Origin') {
    //    child.node.tryRemoveChild('Resource')
    //  }
    //});

    // associate the created OAC with the distribution
    console.log('distribution.node.defaultChild: ', distribution.node.defaultChild)
    const distributionProps = distribution.node.defaultChild;
    //distributionProps?.node.setContext('Properties.DistributionConfig.Origins.0.S3OriginConfig.OriginAccessIdentity', '')
    //distributionProps?.node.setContext("DistributionConfig.Origins.0.OriginAccessControlId", cfnOriginAccessControl.attrId)

    //const cfnDistribution = distribution.node.defaultChild as cloudfront.CfnDistribution;
    //console.log('cfnDistribution: \n', cfnDistribution);
    
    //console.log('cfnDistribution.cfnOptions: \n', cfnDistribution.cfnOptions);
    //console.log('cfnDistribution.cfnOptions: \n', cfnDistribution);
    
    console.log(' \n');
    console.log('siteBucket.bucketDomainName: \n', siteBucket.bucketDomainName);
    console.log('cfnDistribution.attrDomainName: \n', cfnDistribution.attrDomainName);
    console.log('cfnDistribution.distributionConfig: \n', cfnDistribution.distributionConfig);
    
    //console.log('cfnDistribution.distributionConfig: \n', cfnDistribution.distributionConfig);
   
    //cfnDistribution.addDeletionOverride('DistributionConfig.Origins.Items.0.DomainName');
    //cfnDistribution.addPropertyOverride('DistributionConfig.Origins.Items.0.DomainName', siteBucket.bucketDomainName);
    //cfnDistribution.addDeletionOverride('DistributionConfig.Origins.Items.0.OriginAccessControlId');
    cfnDistribution.addPropertyOverride('DistributionConfig.Origins.Items.0.OriginAccessControlId', cfnOriginAccessControl.getAtt('id') ); //.getAtt('id')
    //cfnDistribution.addPropertyOverride('DistributionConfig.Origins.Items.0.OriginAccessControlId', '658327ea-f89d-4fab-a63d-7e88639e58f6' ); //.getAtt('id')
    cfnDistribution.addPropertyOverride('DistributionConfig.Origins.Items.0.OriginAccessControlId_1', '658327ea-f89d-4fab-a63d-7e88639e58f6' ); //.getAtt('id')
    cfnDistribution.addOverride('Properties.Test','Test_value');
    
    console.log(' \n');
    console.log('siteBucket: \n', siteBucket.bucketDomainName);
    console.log('cfnDistribution.attrDomainName: \n', cfnDistribution.attrDomainName);
    console.log('cfnDistribution.distributionConfig: \n', cfnDistribution.distributionConfig);
    //console.log('cfnDistribution.distributionConfig: \n', cfnDistribution.distributionConfig);

    //console.log('cfnOriginAccessControl: \n', cfnOriginAccessControl)

    new s3deployment.BucketDeployment(this, `${appName}-Bucket-Deployment`, {
      sources: [s3deployment.Source.asset("../dist")],
      destinationBucket: siteBucket,
      //distribution: distribution,
      //distributionPaths: ["/*"]
    })


    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}

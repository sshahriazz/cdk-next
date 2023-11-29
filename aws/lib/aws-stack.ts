import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { aws_amplify as amplify } from "aws-cdk-lib";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cfnApp = new amplify.CfnApp(this, "AmpNext", {
      name: "amp-next",
      accessToken: cdk.aws_secretsmanager.Secret.fromSecretCompleteArn(
        this,
        "AmpNextSecret",
        "arn:aws:secretsmanager:ca-central-1:756584577988:secret:github-token-1WbTY9"
      ).secretValue.unsafeUnwrap(),
      repository: "https://github.com/sshahriazz/orbit5",
      enableBranchAutoDeletion: true,
      platform: "WEB_COMPUTE",
    });
    const cfnBranch = new amplify.CfnBranch(this, "AmpNextBranch", {
      appId: cfnApp.attrAppId,
      branchName: "dev-cdk",
    });

    // const cfnDomain = new amplify.CfnDomain(this, "AmpNextDomain", {
    //   appId: cfnApp.attrAppId,
    //   domainName: "domainName",
    //   subDomainSettings: [
    //     {
    //       branchName: cfnBranch.attrBranchName,
    //       prefix: "dev-cdk",
    //     },
    //   ],
    // });
    const output = new cdk.CfnOutput(this, "AmpNextOutput", {
      value: cfnApp.attrAppId,
    });

    console.log(output.stack);
  }
}

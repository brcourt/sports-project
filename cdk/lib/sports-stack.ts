import { CfnOutput, type Stack } from "aws-cdk-lib";
import { Construct } from "constructs";

import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { Api } from "./API/api";
import { Database } from "./Database/database";
import { Storage } from "./Storage/storage";
import { Identity } from "./Identity/cognito";
import { Hack } from "./Hack/s3-api";

export interface SportsStackProps {
  domainName: string;
  certificateArn: string;
}

export class SportsStack extends Construct {
  constructor(parent: Stack, name: string, props: SportsStackProps) {
    super(parent, name);

    // Import existing resources
    const domainName = props.domainName;
    const domainCert = Certificate.fromCertificateArn(
      this,
      "domainCert",
      props.certificateArn
    );

    // Identity
    const idp = new Identity(this, "Identity", {
      domainName,
      domainCert,
    });
    const userPool = idp.userPool;
    const appClient = idp.appClient;

    // Storage
    const storage = new Storage(this, "Storage", { domainName, domainCert });
    const websiteBucket = storage.websiteBucket;

    // Database
    const database = new Database(this, "Database", {});
    const table = database.table;

    // API
    const api = new Api(this, "API", {
      domainName,
      domainCert,
      userPool,
      appClient,
      table,
    });

    // Hack
    const hack = new Hack(this, "Hack", {
      websiteBucket,
      domainName,
      domainCert,
    });

    // Grab the web application's files for deployment.
    // new BucketDeployment(this, `courtney-cloud-deployment`, {
    //   sources: [Source.asset(path.join(__dirname, "../../frontend/dist"))],
    //   destinationBucket: websiteBucket,
    // });

    // Outputs
    new CfnOutput(this, "Site", { value: `https://${domainName}` });
    new CfnOutput(this, "Bucket", { value: `https://${domainName}` });
  }
}

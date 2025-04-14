import { Construct } from "constructs";
import { CfnOutput } from "aws-cdk-lib";
import {
  AttributeType,
  BillingMode,
  ProjectionType,
  Table,
} from "aws-cdk-lib/aws-dynamodb";

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DatabaseProps {}

export class Database extends Construct {
  public readonly table: Table;
  public readonly chatTable: Table;

  constructor(scope: Construct, id: string, props: DatabaseProps) {
    super(scope, id);

    // App table
    this.table = new Table(this, "SportsTable", {
      pointInTimeRecovery: true,
      partitionKey: { name: "ppk", type: AttributeType.STRING },
      sortKey: { name: "psk", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: "ttl",
    });

    this.table.addGlobalSecondaryIndex({
      indexName: "gsi1",
      projectionType: ProjectionType.ALL,
      partitionKey: { name: "gsi1pk", type: AttributeType.STRING },
      sortKey: { name: "gsi1sk", type: AttributeType.STRING },
    });

    this.table.addGlobalSecondaryIndex({
      indexName: "gsi2",
      projectionType: ProjectionType.ALL,
      partitionKey: { name: "gsi2pk", type: AttributeType.STRING },
      sortKey: { name: "gsi2sk", type: AttributeType.STRING },
    });

    // Outputs
    new CfnOutput(this, "Table", { value: this.table.tableName });
  }
}

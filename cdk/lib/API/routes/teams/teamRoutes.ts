import { Construct } from "constructs";
import type { Table } from "aws-cdk-lib/aws-dynamodb";
import type { HttpUserPoolAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import type { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";

// Method Functions
import { GetTeam } from "./get-teams/integration";
import { CreateTeam } from "./create-teams/integration";

export interface ApiEndpointProps {
  table: Table;
  api: HttpApi;
  authorizer: HttpUserPoolAuthorizer;
}

export class TeamRoutes extends Construct {
  constructor(scope: Construct, id: string, props: ApiEndpointProps) {
    super(scope, id);

    // teamRoutes
    new GetTeam(this, "GetTeam", props);
    new CreateTeam(this, "CreateTeam", props);
  }
}

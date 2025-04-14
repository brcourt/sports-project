#!/usr/bin/env node
import "source-map-support/register";
import { App, Stack, type StackProps } from "aws-cdk-lib";
import { SportsStack } from "../lib/sports-stack";

class SportsApp extends Stack {
  constructor(parent: App, name: string, props: StackProps) {
    super(parent, name, props);

    new SportsStack(this, "SportsStack", {
      domainName: "sports.courtney.cloud",
      certificateArn:
        "arn:aws:acm:us-east-1:723564379059:certificate/31a12d44-27b4-4b20-9eb8-4d07654d1ccb",
    });
  }
}

const app = new App();

new SportsApp(app, "SportsStack", {
  env: { account: "723564379059", region: "us-east-1" },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

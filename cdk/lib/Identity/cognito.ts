import * as cdk from "aws-cdk-lib";
import {
  AccountRecovery,
  BooleanAttribute,
  DateTimeAttribute,
  NumberAttribute,
  StringAttribute,
  UserPool,
  type UserPoolClient,
  VerificationEmailStyle,
} from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import type { ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  IdentityPool,
  UserPoolAuthenticationProvider,
} from "aws-cdk-lib/aws-cognito-identitypool";

interface IdpProps {
  domainName: string;
  domainCert: ICertificate;
}

export class Identity extends Construct {
  public readonly userPool: UserPool;
  public readonly appClient: UserPoolClient;
  public readonly identityPool: IdentityPool;

  constructor(scope: Construct, id: string, props: IdpProps) {
    super(scope, id);

    this.userPool = new UserPool(this, "sports-user-pool", {
      userPoolName: "sports-user-pool",
      signInAliases: {
        email: true,
      },
      selfSignUpEnabled: true,
      autoVerify: {
        email: true,
      },
      userVerification: {
        emailSubject: "You need to verify your email",
        emailBody: "Thanks for signing up Your verification code is {####}", // # This placeholder is a must if code is selected as preferred verification method
        emailStyle: VerificationEmailStyle.CODE,
      },
      standardAttributes: {
        familyName: {
          mutable: false,
          required: true,
        },
        address: {
          mutable: true,
          required: false,
        },
      },
      customAttributes: {
        tenantId: new StringAttribute({
          mutable: false,
          minLen: 10,
          maxLen: 15,
        }),
        createdAt: new DateTimeAttribute(),
        employeeId: new NumberAttribute({
          mutable: false,
          min: 1,
          max: 100,
        }),
        isAdmin: new BooleanAttribute({
          mutable: false,
        }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.userPool.addDomain("sports-user-pool-domain", {
      cognitoDomain: {
        domainPrefix: "courtney-sports-auth",
      },
    });

    this.appClient = this.userPool.addClient("sports-app-client", {
      userPoolClientName: "sports-app-client",
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
    });

    this.identityPool = new IdentityPool(this, "myidentitypool", {
      identityPoolName: "sports-identity-pool",
      allowClassicFlow: true,
    });

    this.identityPool.addUserPoolAuthentication(
      new UserPoolAuthenticationProvider({
        userPool: this.userPool,
        userPoolClient: this.appClient,
        disableServerSideTokenCheck: true,
      })
    );
  }
}

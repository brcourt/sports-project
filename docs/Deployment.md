# Deployment

This repo consists of two projects

1. CDK application
2. React application

## Build React

In order to deploy the full stack, you must first build the React application.

1. Navigate to `/frontend` if you aren't already there

```shell
cd frontend
```

2. Install all packages

```shell
pnpm install
```

3. Build React

```shell
npm run build
```

## Deploy CDK

CDK will manage deploying the React application to S3, all that is required as that the React application is built beforehand.

1. Navigate to `/cdk` if you aren't already there

```shell
cd cdk
```

2. Install all packages

```shell
pnpm install
```

3. Synthesize a template if you want to

```shell
cdk synth
```

4. Deploy the CDK stack

```shell
cdk deploy
```

## Update DNS

Before you will be able to access the application on the internet, you will need to make sure that you update the DNS records for the provided domain.

- Create a CNAME record for your main domain name pointing to the Hack API Gateway domain URL. `sports.courtney.cloud`
- Create a CNAME record for the HTTP API. `api.sports.courtney.cloud`

Once the records are created, you should be able to access the application.

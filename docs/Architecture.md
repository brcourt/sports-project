# Architecture

This solution is built with CDK and uses serverless components to keep costs down (I have this running in my own AWS account).

- DynamoDB is used as the database provider
- AWS Lambda is used to handle all compute
- API Gateway v2 is used to host the API
- S3 is used to host the static react application code
- Cognito is used to facilitate authentication

### Why is there no CDN...?

So AWS decided I am not allowed to have any more CloudFront distributions... I need to raise my quota. While I wait for probably days to get that limit increased, I decided to hack the API Gateway v1 to proxy to S3 and manage requests for my static React frontend... This works great, however I don't get any benefits of a CDN, and if I enable caching on the API gateway, well that would be really expensive. Normally, I would obviously use Cloudfront or some other CDN.

### Why am I going the NoSQL route?

The data we are using would absolutely benefit from being stored in a relational database like RDS. The problem with that is, 1. RDS is expensive, and 2. with a good indexing strategy with DynamoDB, its possible to manage very relatable data in a way that is both easy enough and much more scalable. For this demo, I chose Dynamo mostly for cost I would incur, however a much deeper dive into the potential data schema would be necessary.

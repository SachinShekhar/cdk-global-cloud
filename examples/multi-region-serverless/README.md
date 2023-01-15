# Multi-region Serverless Infrastructure with API Gateway, AWS Lambda & DynamoDB Global Tables

This example illustrates use of `cdk-global-cloud` to implement a global serverless infrastructure.

## Architecture Details

- One DynamoDB global table in global region.
- Lambda functions in multiple regions with access to global table through environment variable.

(This example merely demonstrates the `cdk-global-cloud` library. It's by no means a full solution for low latency global serverless infrastructure. Route 53 with API Gateway or Load Balancer will make it complete. Pull Requests to add them to this example won't be entertained as it'll complicate the example. Instead, create a new example.)

import {
  App,
  aws_dynamodb as dynamodb,
  aws_lambda as lambda,
  PhysicalName,
  Stack,
} from 'aws-cdk-lib';

import { Regions, StackSet, Stage } from '../../lib';

export class ExampleStackSet extends StackSet {
  exampleGlobalTable?: dynamodb.Table;

  constructor(scope: App, stage: Stage) {
    super(scope, 'Example', {
      stage,
      globalRegion: 'eu-west-2',
      regionalCoverage: [
        ...Regions.NORTH_AMERICA,
        ...Regions.EUROPE,
        ...Regions.ASIA_PACIFIC,
        'me-central-1',
      ],
    });
  }

  globalStackBuilder() {
    return (scope: Stack) => {
      this.exampleGlobalTable = new dynamodb.Table(scope, 'ExampleTable', {
        partitionKey: {
          name: 'exampleKey',
          type: dynamodb.AttributeType.STRING,
        },
        replicationRegions: this.regionalCoverage.filter(
          (region) => region !== this.globalRegion
        ),
        tableName: PhysicalName.GENERATE_IF_NEEDED,
      });
    };
  }

  regionalStackBuilder() {
    return (scope: Stack) => {
      const exampleLambda = new lambda.Function(scope, 'ExampleLambda', {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'handler',
        code: lambda.Code.fromInline(
          'exports.handler = () => {console.log(process.env.EXAMPLE_TABLE_NAME); return "SUCCESS"}'
        ),
        environment: {
          EXAMPLE_TABLE_NAME: this.exampleGlobalTable!.tableName,
        },
        functionName: PhysicalName.GENERATE_IF_NEEDED,
      });

      this.exampleGlobalTable!.grant(
        exampleLambda,
        'dynamodb:PutItem',
        'dynamodb:GetItem',
        'dynamodb:UpdateItem'
      );
    };
  }
}

import {
  App,
  aws_dynamodb as dynamodb,
  aws_lambda as lambda,
  PhysicalName,
  Stack,
} from 'aws-cdk-lib';

import { Regions, GlobalCloud, Stage } from '../../lib';

export class ApiGlobalCloud extends GlobalCloud {
  dataGlobalTable?: dynamodb.Table;

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
      this.dataGlobalTable = new dynamodb.Table(scope, 'DataTable', {
        partitionKey: {
          name: 'entityId',
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
      const exampleLambda = new lambda.Function(scope, 'ApiHandler', {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'handler',
        code: lambda.Code.fromInline(
          'exports.handler = () => {console.log(process.env.EXAMPLE_TABLE_NAME); return "SUCCESS"}'
        ),
        environment: {
          DATA_TABLE_NAME: this.dataGlobalTable?.tableName ?? '',
        },
        functionName: PhysicalName.GENERATE_IF_NEEDED,
      });

      this.dataGlobalTable?.grant(
        exampleLambda,
        'dynamodb:PutItem',
        'dynamodb:GetItem',
        'dynamodb:UpdateItem'
      );
    };
  }
}

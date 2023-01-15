import * as cdk from 'aws-cdk-lib';

import { Stage } from '../../lib';
import { ApiGlobalCloud } from './api-global-cloud';

const app = new cdk.App();

new ApiGlobalCloud(
  app,
  new Stage('Dev', {
    account: '0123456789', // process.env can be used if you don't want to include this in your source control
  })
);

new ApiGlobalCloud(
  app,
  new Stage('Test', {
    account: '5674321890', // process.env can be used if you don't want to include this in your source control
  })
);

new ApiGlobalCloud(
  app,
  new Stage('Prod', {
    account: '9876543210', // process.env can be used if you don't want to include this in your source control
    terminationProtection: true,
  })
);

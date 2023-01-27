import * as cdk from 'aws-cdk-lib';

import { Regions, Stage } from '../../lib';
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

export const prodAPICloud = new ApiGlobalCloud(
  app,
  new Stage('Prod', {
    account: '9876543210', // process.env can be used if you don't want to include this in your source control
    regionalAccounts: {
      ...Regions.EUROPE.map((region) => ({ [region]: '364572292763' })),
      'ap-south-1': '877347237637',
      'eu-west-1': '655435786756',
    },
    terminationProtection: true,
  })
);

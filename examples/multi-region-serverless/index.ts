import * as cdk from 'aws-cdk-lib';

import { Stage } from '../../lib';
import { ExampleStackSet } from './example-stack-set';

const app = new cdk.App();

new ExampleStackSet(
  app,
  new Stage('Dev', {
    account: '0123456789', // process.env can be used if you don't want to include this in your source control
  })
);

new ExampleStackSet(
  app,
  new Stage('Test', {
    account: '5674321890', // process.env can be used if you don't want to include this in your source control
  })
);

new ExampleStackSet(
  app,
  new Stage('Prod', {
    account: '9876543210', // process.env can be used if you don't want to include this in your source control
    terminationProtection: true,
  })
);

import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { ApiGlobalCloud } from '../examples/multi-region-serverless/api-global-cloud';
import { Stage } from '../lib';

const app = new cdk.App();

describe('API Global Cloud', () => {
  test('synthesizes correctly', () => {
    const apiGlobalCloud = new ApiGlobalCloud(
      app,
      new Stage('Dev', { account: '0123456789' })
    );

    const globalTemplate = Template.fromStack(
      apiGlobalCloud.generatedStacks[0]
    );
    const regionalTemplate = Template.fromStack(
      apiGlobalCloud.generatedStacks[1]
    );

    expect(globalTemplate.toJSON()).toMatchSnapshot();
    expect(regionalTemplate.toJSON()).toMatchSnapshot();
  });
});

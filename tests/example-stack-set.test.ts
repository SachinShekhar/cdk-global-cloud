import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { ExampleStackSet } from '../examples/multi-region-serverless/example-stack-set';
import { Stage } from '../lib';

const app = new cdk.App();

describe('ExampleStackSet', () => {
  test('synthesizes correctly', () => {
    const exampleStackSet = new ExampleStackSet(
      app,
      new Stage('Dev', { account: '0123456789' })
    );

    const globalTemplate = Template.fromStack(
      exampleStackSet.generatedStacks[0]
    );
    const regionalTemplate = Template.fromStack(
      exampleStackSet.generatedStacks[1]
    );

    expect(globalTemplate.toJSON()).toMatchSnapshot();
    expect(regionalTemplate.toJSON()).toMatchSnapshot();
  });
});

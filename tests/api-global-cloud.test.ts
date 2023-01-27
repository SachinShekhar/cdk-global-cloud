import { Template } from 'aws-cdk-lib/assertions';
import { prodAPICloud } from '../examples/multi-region-serverless';

describe('API Global Cloud', () => {
  test('synthesizes correctly', () => {
    prodAPICloud.stacks.forEach((stack) => {
      const template = Template.fromStack(stack);
      expect(template.toJSON()).toMatchSnapshot();
    });
  });
});

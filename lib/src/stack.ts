import { App, Stack, StackProps } from 'aws-cdk-lib';

export interface GlobalCloudStackProps extends StackProps {
  readonly builder: (scope: Stack) => void;
}

export class GlobalCloudStack extends Stack {
  constructor(scope: App, id: string, props: GlobalCloudStackProps) {
    super(scope, id, props);
    props.builder(this);
  }
}

import { App, Stack, StackProps } from 'aws-cdk-lib';

export interface StackBuilderProps extends StackProps {
  readonly build: (scope: Stack) => void;
}

export class StackBuilder extends Stack {
  constructor(scope: App, id: string, props: StackBuilderProps) {
    super(scope, id, props);
    props.build(this);
  }
}

import { App, Stack, StackProps } from 'aws-cdk-lib';

export interface ConstructBuilderProps extends StackProps {
  readonly build: (scope: Stack) => void;
}

export class ConstructBuilder extends Stack {
  constructor(scope: App, id: string, props: ConstructBuilderProps) {
    super(scope, id, props);
    props.build(this);
  }
}

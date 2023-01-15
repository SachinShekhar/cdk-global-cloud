import { App, Stack, StackProps } from 'aws-cdk-lib';

import { Region } from './region';
import { Stage } from './stage';

export interface StackSetStackProps extends StackProps {
  readonly builder: (scope: Stack) => void;
}

export class StackSetStack extends Stack {
  constructor(scope: App, id: string, props: StackSetStackProps) {
    super(scope, id, props);
    props.builder(this);
  }
}

export interface StackSetProps {
  stage: Stage;
  globalRegion?: Region;
  regionalCoverage: Region[];
  tags?: { [key: string]: string };
}

export abstract class StackSet {
  readonly stage: Stage;
  readonly globalRegion: Region;
  readonly regionalCoverage: Region[];

  constructor(scope: App, id: string, props: StackSetProps) {
    this.stage = props.stage;
    this.globalRegion = props.globalRegion ?? 'us-east-1';
    this.regionalCoverage = props.regionalCoverage;

    const tags = {
      stackSet: id,
      stage: this.stage.name,
      ...props.tags,
    };

    new StackSetStack(scope, id + 'Global' + this.stage.name + 'Stack', {
      builder: this.globalStackBuilder(),
      env: {
        account: this.stage.account,
        region: this.globalRegion,
      },
      tags,
      terminationProtection: this.stage.terminationProtection,
    });

    this.regionalCoverage.forEach((region) => {
      new StackSetStack(scope, id + region + this.stage.name + 'Stack', {
        builder: this.regionalStackBuilder(),
        env: {
          account: this.stage.account,
          region,
        },
        tags,
        terminationProtection: this.stage.terminationProtection,
      });
    });
  }

  abstract globalStackBuilder(): (scope: Stack) => void;

  abstract regionalStackBuilder(): (scope: Stack) => void;
}

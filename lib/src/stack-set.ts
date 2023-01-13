import { App, Stack } from 'aws-cdk-lib';

import { Region } from './region';
import { Stage } from './stage';
import { ConstructBuilder } from './construct-builder';

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

    new ConstructBuilder(scope, id + 'Global' + this.stage.name, {
      build: this.globalConstructs,
      env: {
        account: this.stage.account,
        region: this.globalRegion,
      },
      tags,
    });

    this.regionalCoverage.forEach((region) => {
      new ConstructBuilder(scope, id + region + this.stage.name, {
        build: this.regionalConstructs,
        env: {
          account: this.stage.account,
          region,
        },
        tags,
      });
    });
  }

  abstract globalConstructs(scope: Stack): void;
  abstract regionalConstructs(scope: Stack): void;
}

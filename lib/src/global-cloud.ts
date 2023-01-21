import { App, Stack } from 'aws-cdk-lib';

import { getRegionName, Region } from './region';
import { GlobalCloudStack } from './stack';
import { Stage } from './stage';

export interface GlobalCloudProps {
  stage: Stage;
  globalRegion?: Region;
  regionalCoverage: Region[];
  tags?: { [key: string]: string };
}

export abstract class GlobalCloud {
  readonly stage: Stage;
  readonly globalRegion: Region;
  readonly regionalCoverage: Region[];
  readonly stacks: Stack[];

  constructor(scope: App, id: string, props: GlobalCloudProps) {
    this.stage = props.stage;
    this.globalRegion = props.globalRegion ?? 'us-east-1';
    this.regionalCoverage = props.regionalCoverage;

    const tags = {
      globalCloud: id,
      stage: this.stage.name,
      ...props.tags,
    };

    const globalStack = new GlobalCloudStack(
      scope,
      id + 'Global' + this.stage.name + 'Stack',
      {
        builder: this.globalStackBuilder(),
        env: {
          account: this.stage.account,
          region: this.globalRegion,
        },
        tags,
        terminationProtection: this.stage.terminationProtection,
      }
    );

    this.stacks = [globalStack];

    this.regionalCoverage.forEach((region) => {
      const regionalStack = new GlobalCloudStack(
        scope,
        id + getRegionName(region) + this.stage.name + 'Stack',
        {
          builder: this.regionalStackBuilder(region),
          env: {
            account: this.stage.account,
            region,
          },
          tags,
          terminationProtection: this.stage.terminationProtection,
        }
      );

      this.stacks.push(regionalStack);
    });
  }

  abstract globalStackBuilder(): (scope: Stack) => void;

  abstract regionalStackBuilder(region: Region): (scope: Stack) => void;
}

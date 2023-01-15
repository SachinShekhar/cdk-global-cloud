import { App, Stack, StackProps } from 'aws-cdk-lib';

import { Region } from './region';
import { Stage } from './stage';

export interface GlobalCloudStackProps extends StackProps {
  readonly builder: (scope: Stack) => void;
}

export class GlobalCloudStack extends Stack {
  constructor(scope: App, id: string, props: GlobalCloudStackProps) {
    super(scope, id, props);
    props.builder(this);
  }
}

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
  readonly generatedStacks: Stack[];

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

    this.generatedStacks = [globalStack];

    this.regionalCoverage.forEach((region) => {
      const regionalStack = new GlobalCloudStack(
        scope,
        id + region + this.stage.name + 'Stack',
        {
          builder: this.regionalStackBuilder(),
          env: {
            account: this.stage.account,
            region,
          },
          tags,
          terminationProtection: this.stage.terminationProtection,
        }
      );

      this.generatedStacks.push(regionalStack);
    });
  }

  abstract globalStackBuilder(): (scope: Stack) => void;

  abstract regionalStackBuilder(): (scope: Stack) => void;
}
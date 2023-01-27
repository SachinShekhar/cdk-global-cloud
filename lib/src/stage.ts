import { Region } from './region';

export interface StageProps {
  account: string;
  regionalAccounts?: { [region in Region]?: string };
  terminationProtection?: boolean;
}

export class Stage {
  readonly name: string;
  readonly account: string;
  readonly regionalAccounts?: { [region in Region]?: string };
  readonly terminationProtection: boolean;

  constructor(name: string, props: StageProps) {
    this.name = name;
    this.account = props.account;
    this.regionalAccounts = props.regionalAccounts;
    this.terminationProtection = props.terminationProtection ?? false;
  }
}

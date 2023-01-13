export interface StageProps {
  account: string;
  terminationProtection: boolean;
}

export class Stage {
  readonly name: string;
  readonly account: string;
  readonly terminationProtection: boolean;

  constructor(name: string, props: StageProps) {
    this.name = name;
    this.account = props.account;
    this.terminationProtection = props.terminationProtection;
  }
}

export type Region =
  | 'us-east-1'
  | 'us-east-2'
  | 'us-west-1'
  | 'us-west-2'
  | 'ca-central-1'
  | 'eu-central-1'
  | 'eu-central-2'
  | 'eu-north-1'
  | 'eu-west-1'
  | 'eu-west-2'
  | 'eu-west-3'
  | 'eu-south-1'
  | 'eu-south-2'
  | 'ap-east-1'
  | 'ap-south-1'
  | 'ap-south-2'
  | 'ap-southeast-1'
  | 'ap-southeast-2'
  | 'ap-southeast-3'
  | 'ap-northeast-1'
  | 'ap-northeast-2'
  | 'ap-northeast-3'
  | 'sa-east-1'
  | 'me-central-1'
  | 'me-south-1'
  | 'af-south-1'
  | 'us-gov-east-1'
  | 'us-gov-west-1';

export class Regions {
  static readonly ALL: Region[] = [
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
    'ca-central-1',
    'eu-central-1',
    'eu-central-2',
    'eu-north-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
    'eu-south-1',
    'eu-south-2',
    'ap-east-1',
    'ap-south-1',
    'ap-south-2',
    'ap-southeast-1',
    'ap-southeast-2',
    'ap-southeast-3',
    'ap-northeast-1',
    'ap-northeast-2',
    'ap-northeast-3',
    'sa-east-1',
    'me-central-1',
    'me-south-1',
    'af-south-1',
  ];

  static readonly NORTH_AMERICA: Region[] = [
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
    'ca-central-1',
  ];

  static readonly SOUTH_AMERICA: Region[] = ['sa-east-1'];

  static readonly EUROPE: Region[] = [
    'eu-central-1',
    'eu-central-2',
    'eu-north-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
    'eu-south-1',
    'eu-south-2',
  ];

  static readonly ASIA_PACIFIC: Region[] = [
    'ap-south-1',
    'ap-south-2',
    'ap-southeast-1',
    'ap-southeast-2',
    'ap-southeast-3',
    'ap-northeast-1',
    'ap-northeast-2',
    'ap-northeast-3',
  ];

  static readonly MIDDLE_EAST: Region[] = ['me-central-1', 'me-south-1'];

  static readonly AFRICA: Region[] = ['af-south-1'];

  static readonly GOVERNMENT: Region[] = ['us-gov-east-1', 'us-gov-west-1'];
}

export function getRegionName(region: Region): string {
  return (<{ [K in Region]: string }>{
    'us-east-1': 'NorthVirginia',
    'us-east-2': 'Ohio',
    'us-west-1': 'NorthCalifornia',
    'us-west-2': 'Oregon',
    'ca-central-1': 'Canada',
    'eu-central-1': 'Frankfurt',
    'eu-central-2': 'Zurich',
    'eu-north-1': 'Stockholm',
    'eu-west-1': 'Ireland',
    'eu-west-2': 'London',
    'eu-west-3': 'Paris',
    'eu-south-1': 'Milan',
    'eu-south-2': 'Spain',
    'ap-east-1': 'HongKong',
    'ap-south-1': 'Mumbai',
    'ap-south-2': 'Hyderabad',
    'ap-southeast-1': 'Singapore',
    'ap-southeast-2': 'Sydney',
    'ap-southeast-3': 'Jakarta',
    'ap-northeast-1': 'Tokyo',
    'ap-northeast-2': 'Seoul',
    'ap-northeast-3': 'Osaka',
    'sa-east-1': 'SaoPaulo',
    'me-central-1': 'UAE',
    'me-south-1': 'Bahrain',
    'af-south-1': 'CapeTown',
    'us-gov-east-1': 'USGovCloudEast',
    'us-gov-west-1': 'USGovCloudWest',
  })[region];
}

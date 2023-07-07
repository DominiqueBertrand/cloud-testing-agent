export interface IPmEnvironment {
  id: string;
  ref?: string;
  createdAt: Date;
  updatedAt?: Date;
  environment: IEnvironment;
}

export interface IEnvironment {
  info: IInfo;
  event: object;
  variable: object;
}

export interface IInfo {
  _postman_id: string;
  name: string;
  schema: string;
  _exporter_id: string;
}

export type PagingMeta =
  | { pagingType: 'forward'; after?: string; first: number }
  | { pagingType: 'backward'; before?: string; last: number }
  | { pagingType: 'none' };

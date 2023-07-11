export interface IPmEnvironment {
  id: string;
  ref?: string;
  createdAt: Date;
  updatedAt?: Date;
  environment: IEnvironment;
}

export interface IEnvironment {
  id: string;
  name: string;
  values: object[];
}

export interface IInfo {
  _postman_id: string;
  name: string;
  schema: string;
  _exporter_id: string;
}

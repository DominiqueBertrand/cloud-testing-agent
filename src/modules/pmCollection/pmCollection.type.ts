export interface IPmCollection {
  id: string;
  name?: string;
  ref?: string;
  createdAt?: Date;
  updatedAt?: Date;
  collection?: ICollection;
}

export interface ICollection {
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

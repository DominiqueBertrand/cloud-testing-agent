import { ApiProperty } from '@nestjs/swagger';

export class tests {
  constructor(public id_collection: string, public title: string) {}
}

export enum Status {
  created,
  failed,
  aborded,
  running,
  finished,
}

export interface IPostmanModel {
  Id: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
  status: Status;
  collectionId: string;
  envId: string;
  run: object;
}

export class PostmanModel implements IPostmanModel {
  @ApiProperty({ example: 1, description: 'The ID of the Postman' })
  Id: string;
  @ApiProperty({ example: 'title', description: 'The title of the Postman' })
  title: string;
  createdAt: string;
  modifiedAt: string;
  status: Status;
  collectionId: string;
  envId: string;
  run: object;

  constructor(
    Id: string,
    title: string,
    createdAt: string,
    modifiedAt: string,
    status: Status,
    collectionId: string,
    envId: string,
    run: object,
  ) {
    this.Id = Id;
    this.title = title;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.status = status;
    this.collectionId = collectionId;
    this.envId = envId;
    this.run = run;
  }
}

export class collectionsList {
  constructor(public Id: string, public name: string, public collection: string) {}
}

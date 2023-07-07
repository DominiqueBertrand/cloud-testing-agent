import { ApiProperty } from '@nestjs/swagger';

export class tests {
  constructor(public id_collection: string, public title: string) {}
}

export interface IPostmanModel {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  collectionId: string;
  envId: string;
  run: object;
}

export class PostmanModel implements IPostmanModel {
  @ApiProperty({ example: 1, description: 'The ID of the Postman' })
  id: string;
  @ApiProperty({ example: 'title', description: 'The title of the Postman' })
  title: string;
  status: string;
  createdAt: string;
  collectionId: string;
  envId: string;
  run: object;

  constructor(
    id: string,
    title: string,
    status: string,
    createdAt: string,
    collectionId: string,
    envId: string,
    run: object,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.createdAt = createdAt;
    this.collectionId = collectionId;
    this.envId = envId;
    this.run = run;
  }
}

export class collectionsList {
  constructor(public id: string, public name: string, public collection: string) {}
}

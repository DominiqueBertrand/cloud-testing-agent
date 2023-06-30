export class tests {
  constructor(public id_collection: string, public title: string) {}
}

export class PostmanModel {
  constructor(public id: string, public title: string, public collectionId: string, public createAt: string) {}
}

export class collectionsList {
  constructor(public id: string, public name: string, public collection: string) {}
}

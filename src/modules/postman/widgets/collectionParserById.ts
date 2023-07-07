import { getCollectionById } from './getCollectionById';
import { getEnvById } from './getEnvById';

export function getEnv(id: string): object {
  const data: object = getEnvById(id);

  return data;
}

export function getCollection(id: string): object {
  const data: object = getCollectionById(id);

  return data;
}

export function getCollections(collectionIds: object): object {
  const collections: Array<object> = [];

  for (let i = 0; i < Object.values(collectionIds).length; i++) {
    collections.push(getCollection(collectionIds[i].id_collection));
  }

  return collections;
}

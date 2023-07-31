import { User } from '@src/entities';

export const sanitizeUser = (user: User): User => {
  const dynamicKey = 'password';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [dynamicKey]: _, ...rest } = user;

  return rest;
};

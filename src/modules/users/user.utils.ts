import { User } from '@src/entities';
import * as bcrypt from 'bcrypt';

export const sanitizeUser = (user: User): User => {
  const dynamicKey = 'password';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [dynamicKey]: _, ...rest } = user;

  return rest;
};

export const hashPassword = async (password: string) => {
  // Hash user password
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

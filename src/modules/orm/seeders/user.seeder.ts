import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '@src/entities';
import { UserRole } from '../../users/user.enum';

/**
 * Runs the UserSeeder, creating a new user with admin roles.
 *
 * @param em - The EntityManager instance to use for database operations.
 * @returns A Promise that resolves when the seeder has finished running.
 */
export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user: User = new User(
      'coog', // username
      '$2b$12$idrUtHWd1hWM8z3DT8nP8.sQRwHePijmZlOnLm8EYvlM1Fbq2U9ZO', // encrypted password (changeme)
      [UserRole.ADMIN, UserRole.USER], // roles
      'coog@coopengo.com', //email
    );
    em.persist(user);
  }
}

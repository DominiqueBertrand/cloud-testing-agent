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
      '$2b$12$zTzjTKkPS/lijJ1g9ctSJ.Hv6AADekeZAvAFvvsfwPvhSkzl7AABi', // encrypted password (changeme)
      [UserRole.ADMIN, UserRole.USER], // roles
      'coog@coopengo.com', //email
    );
    em.persist(user);
  }
}

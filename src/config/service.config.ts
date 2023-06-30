import { registerAs } from '@nestjs/config';

export const port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000;

export default registerAs('service', () => ({
  port,
}));

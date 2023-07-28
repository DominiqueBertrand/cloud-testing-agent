import { registerAs } from '@nestjs/config';

export const port: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000;
export const jsonParserLimit: string = process.env.JSON_PARSER_LIMIT ? process.env.JSON_PARSER_LIMIT : '20mb';
export const jwtSecret: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret';
export const jwtAccessExpiresIn: string = process.env.JWT_ACCESS_EXPIRESIN ? process.env.JWT_ACCESS_EXPIRESIN : '15m';
export const jwtRefreshExpiresIn: string = process.env.JWT_REFRESH_EXPIRESIN ? process.env.JWT_REFRESH_EXPIRESIN : '1h';

export default registerAs('service', () => ({
  port,
  jsonParserLimit,
  jwt: {
    jwtSecret,
    jwtAccessExpiresIn,
    jwtRefreshExpiresIn,
  },
}));

import { registerAs } from '@nestjs/config';

export const port: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000;
export const jsonParserLimit: string = process.env.JSON_PARSER_LIMIT ? process.env.JSON_PARSER_LIMIT : '20mb';
export const jwtSecret: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret';
export const jwtAccessExpiresIn: string = process.env.JWT_ACCESS_EXPIRESIN ? process.env.JWT_ACCESS_EXPIRESIN : '15m';
export const jwtRefreshExpiresIn: string = process.env.JWT_REFRESH_EXPIRESIN ? process.env.JWT_REFRESH_EXPIRESIN : '1h';
export const dbName: string = process.env.DB_NAME ? process.env.DB_NAME : 'coog-cloud-agent.db.sqlite';
export const dbPath: string = process.env.DB_PATH ? process.env.DB_PATH : dbName;
export const dbPort: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3307;

export default registerAs('service', () => ({
  port,
  jsonParserLimit,
  jwt: {
    jwtSecret,
    jwtAccessExpiresIn,
    jwtRefreshExpiresIn,
  },
  dbName,
  dbPath,
  dbPort,
}));

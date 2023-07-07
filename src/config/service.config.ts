import { registerAs } from '@nestjs/config';

export const port: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000;
export const jsonParserLimit: string = process.env.JSON_PARSER_LIMIT ? process.env.JSON_PARSER_LIMIT : '20mb';

export default registerAs('service', () => ({
  port,
  jsonParserLimit,
}));

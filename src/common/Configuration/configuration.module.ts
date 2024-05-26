import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { existsSync } from 'fs';
import * as Joi from 'joi';
import { resolve } from 'path';

const envFilePath: string = getEnvPath(`${__dirname}/../../../src/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      validationSchema: Joi.object({
        ACCESS_SECRET_KEY: Joi.string().required(),
        REFRESH_SECRET_KEY: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
        SALT_ROUNDS: Joi.number().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_SYNCHRONIZE: Joi.boolean().required(),
        AWS_S3_BUCKET: Joi.string().required(),
        AWS_ACCESS_KEY: Joi.string().required(),
        AWS_ACCESS_SECRET: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        NOVA_POST_API_KEY: Joi.string().required(),
        PUBLIC_LIQPAY_KEY: Joi.string().required(),
        PRIVATE_LIQPAY_KEY: Joi.string().required()
      }),
    }),
  ],
})
export class ConfigurationModule { }

function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `${env}.env` : 'development.env';
  let filePath: string = resolve(`${dest}/${filename}`);
  if (!existsSync(filePath)) {
    filePath = fallback;
  }
  return filePath;
}

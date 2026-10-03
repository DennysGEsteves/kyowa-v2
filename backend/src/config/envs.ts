import { config } from 'dotenv';

config({
  path: '.env',
});

export const envs = {
  PORT: process.env.PORT,
  ENV: process.env.ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

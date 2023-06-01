import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,

  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,

  FORGOT_SECRET: process.env.FORGOT_SECRET,
  ACTIVATE_SECRET: process.env.ACTIVATE_SECRET,

  PASSWORD_SALT: process.env.PASSWORD_SALT,
};

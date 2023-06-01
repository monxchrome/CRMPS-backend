import bcrypt from "bcrypt";

import { configs } from "../config/config";

class OauthService {
  public async compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, +configs.PASSWORD_SALT);
  }
}

export const oauthService = new OauthService();

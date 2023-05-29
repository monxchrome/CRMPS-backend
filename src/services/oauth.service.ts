import bcrypt from "bcrypt";

class OauthService {
  public async compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

export const oauthService = new OauthService();

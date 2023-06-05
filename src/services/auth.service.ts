import { ApiError } from "../errors";
import { Admin, Token } from "../models";
import { IAdmin, ICredentials, ITokenPair, ITokenPayload } from "../types";
import { oauthService } from "./oauth.service";
import { tokenService } from "./token.service";

class AuthService {
  public async login(
    credentials: ICredentials,
    admin: IAdmin
  ): Promise<ITokenPair> {
    try {
      const isMatched = await oauthService.compare(
        credentials.password,
        admin.password
      );

      if (!isMatched) {
        throw new ApiError("Invalid email or password", 400);
      }

      const tokenPair = tokenService.generateTokenPair({
        _id: admin._id,
        name: admin.name,
      });

      await Token.create({
        _admin_id: admin._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    tokenData: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });

      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokenData.refreshToken }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async register(body: IAdmin): Promise<void> {
    try {
      const { password } = body;

      const hashedPassword = await oauthService.hash(password);

      await Admin.create({
        ...body,
        password: hashedPassword,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();

import { ApiError } from "../errors/api.error";
import { Token } from "../models/Token.model";
import { IAdmin } from "../types/admin.types";
import { ICredentials } from "../types/auth.types";
import { ITokenPair, ITokenPayload } from "../types/token.types";
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
        _user_id: admin._id,
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
}

export const authService = new AuthService();

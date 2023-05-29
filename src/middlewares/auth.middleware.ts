import { NextFunction, Request, Response } from "express";

import { EToken } from "../enums/token.enum";
import { ApiError } from "../errors/api.error";
import { Token } from "../models/Token.model";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("Your refresh token has expired", 404);
      }

      const jwtPayload = tokenService.checkToken(refreshToken, EToken.refresh);
      const tokenData = await Token.findOne({ refreshToken });

      if (!tokenData) {
        throw new ApiError("Refresh token is not valid", 401);
      }

      req.res.locals = { tokenData, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
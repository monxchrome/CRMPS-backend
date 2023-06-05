import { NextFunction, Request, Response } from "express";

import { authService } from "../services";
import { IAdmin, ITokenPair } from "../types";

class AuthController {
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokenPair>> {
    try {
      const { email, password } = req.body;
      const { admin } = req.res.locals;

      const tokenPair = await authService.login(
        { email, password },
        admin as IAdmin
      );

      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenData, jwtPayload } = req.res.locals;

      const tokenPair = await authService.refresh(tokenData, jwtPayload);

      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(req.body);

      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();

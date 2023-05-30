import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IQuery } from "../types/pagination.types";
import { IUser } from "../types/user.types";
import {ICommonRes} from "../types/common.types";
import {ITokenPayload} from "../types/token.types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getPagination(
        req.query as unknown as IQuery
      );

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { user, jwtPayload } = res.locals;
      const result = await userService.getById(user._id, jwtPayload._id);

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<IUser>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const user = await userService.create(req.body, _id);

      return res.status(200).json({
        message: "User created",
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<IUser>>> {
    try {
      const { userId } = req.params;
      const user = req.body;

      await userService.update(userId, user);

      return res.json({
        message: "Car updated",
      });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<IUser>>> {
    try {
      const { userId } = req.params;

      const deleteUser = await userService.delete(userId);
      return res.json({
        message: "User deleted",
        data: deleteUser,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();

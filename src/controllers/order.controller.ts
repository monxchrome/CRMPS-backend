import { NextFunction, Request, Response } from "express";

import { orderService } from "../services/order.service";
import { ICommonRes } from "../types/common.types";
import { IOrder } from "../types/order.types";
import { IQuery } from "../types/pagination.types";
import { ITokenPayload } from "../types/token.types";

class OrderController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IOrder[]>> {
    try {
      const users = await orderService.getPagination(
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
  ): Promise<Response<IOrder>> {
    try {
      const { user, jwtPayload } = res.locals;
      const result = await orderService.getById(user._id, jwtPayload._id);

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<IOrder>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const user = await orderService.create(req.body, _id);

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
  ): Promise<Response<ICommonRes<IOrder>>> {
    try {
      const { userId } = req.params;
      const user = req.body;

      await orderService.update(userId, user);

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
  ): Promise<Response<ICommonRes<IOrder>>> {
    try {
      const { userId } = req.params;

      const deleteUser = await orderService.delete(userId);
      return res.json({
        message: "User deleted",
        data: deleteUser,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const orderController = new OrderController();

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
      const orders = await orderService.getPagination(
        req.query as unknown as IQuery
      );

      return res.json(orders);
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
      const { order, jwtPayload } = res.locals;
      const result = await orderService.getById(order._id, jwtPayload._id);

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
      const order = await orderService.create(req.body, _id);

      return res.status(200).json({
        message: "Order created",
        data: order,
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
      const { orderId } = req.params;
      const user = req.body;

      await orderService.update(orderId, user);

      return res.json({
        message: "Car updated",
      });
    } catch (e) {
      next(e);
    }
  }
}

export const orderController = new OrderController();

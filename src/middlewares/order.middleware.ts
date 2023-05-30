import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";
import { Order } from "../models/Order.model";
import { IRequest } from "../types/common.types";
import { AuthValidator } from "../validators/auth.validator";
import { OrderValidator } from "../validators/order.validator";

class OrderMiddleware {
  public async isValidLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = AuthValidator.loginUser.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public getDynamicallyOrThrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const admin = await Order.findOne({ [dbField]: fieldValue });

        if (!admin) {
          throw new ApiError(`Admin not found`, 422);
        }

        res.locals.admin = admin;

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = OrderValidator.create.validate(req.body);

      if (error) {
        return next(new ApiError(error.message, 405));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isIDValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.userId)) {
        return next(new ApiError("User id is not valid", 422));
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await Order.findById(userId);

      if (!user) {
        throw new ApiError("User not found!", 404);
      }

      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = OrderValidator.update.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const orderMiddleware = new OrderMiddleware();

import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Admin } from "../models";
import { IRequest } from "../types";
import { AdminValidator, AuthValidator } from "../validators";

class AdminMiddleware {
  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = AdminValidator.create.validate(req.body);

      if (error) {
        return next(new ApiError(error.message, 405));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public getDynamicallyAndThrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const admin = await Admin.findOne({ [dbField]: fieldValue });

        if (admin) {
          throw new ApiError(
            `Admin with ${fieldName} ${fieldValue} already exist`,
            409
          );
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public getDynamicallyOrThrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const admin = await Admin.findOne({ [dbField]: fieldValue });

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
}

export const adminMiddleware = new AdminMiddleware();

import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { Admin } from "../models/Admin.model";
import { IRequest } from "../types/common.types";
import { AdminValidator } from "../validators/admin.validator";

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
}

export const adminMiddleware = new AdminMiddleware();

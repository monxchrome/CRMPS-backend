import { NextFunction, Request, Response } from "express";

import { groupService } from "../services";
import { IComment, ICommonRes, IGroup, IQuery } from "../types";

class GroupController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IComment[]>> {
    try {
      const groups = await groupService.getPagination(
        req.query as unknown as IQuery
      );

      return res.json(groups);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<IGroup>>> {
    try {
      const { orderId } = req.params;

      const group = await groupService.create(orderId, req.body);

      return res.status(200).json({
        message: "Group created",
        data: group,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const groupController = new GroupController();

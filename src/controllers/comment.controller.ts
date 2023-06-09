import { NextFunction, Request, Response } from "express";

import { commentService } from "../services";
import { IComment, ICommonRes, IQuery, ITokenPayload } from "../types";

class CommentController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IComment[]>> {
    try {
      const comments = await commentService.getPagination(
        req.query as unknown as IQuery
      );

      return res.json(comments);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<IComment>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const { orderId } = req.params;
      const comment = await commentService.create(orderId, req.body, _id);

      return res.status(200).json({
        message: "Comment created",
        data: comment,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const commentController = new CommentController();

import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Comment, Order } from "../models";
import { IComment, IPaginationResponse, IQuery } from "../types";

class CommentService {
  public async getPagination(query: IQuery): Promise<IPaginationResponse<any>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        limit = 5,
        sort = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);

      const comments = await Comment.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .lean();
      const commentsCount = await Comment.count();

      return {
        page: +page,
        perPage: +limit,
        valueCount: commentsCount,
        valueFound: comments.length,
        data: comments,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(orderId: string, data: IComment, userId: string) {
    try {
      const comment = await Comment.create({
        ...data,
        user: new Types.ObjectId(userId),
      });

      await Order.updateOne({ _id: orderId }, { $push: { comments: comment } });

      return comment;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const commentService = new CommentService();

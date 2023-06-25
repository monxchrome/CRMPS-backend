import { Types } from "mongoose";

import { Order } from "../models";
import { IOrder } from "../types";

class OrderRepository {
  public async getByAdminAndUser(orderId: string): Promise<IOrder> {
    const result = await Order.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(orderId),
        },
      },
      {
        $lookup: {
          from: "admins",
          localField: "manager",
          foreignField: "_id",
          as: "manager",
        },
      },
      {
        $unwind: {
          path: "$manager",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { commentIds: "$comments" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$commentIds"],
                },
              },
            },
            {
              $lookup: {
                from: "admins",
                localField: "user",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
          as: "comments",
        },
      },
    ]);
    return result[0];
  }
}

export const orderRepository = new OrderRepository();

import { Types } from "mongoose";

import { Order } from "../models/Order.model";
import { IOrder } from "../types/order.types";

class OrderRepository {
  public async getByAdminAndUser(
    orderId: string,
    adminId: string
  ): Promise<IOrder> {
    const result = await Order.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(orderId),
          manager: new Types.ObjectId(adminId),
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
          localField: "comments",
          foreignField: "_id",
          as: "comments",
        },
      },
    ]);
    return result[0];
  }
}

export const userRepository = new OrderRepository();

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
          _id: orderId,
          manager: new Types.ObjectId(adminId),
        },
      },
      {
        $lookup: {
          from: "admins", // model in db "admins" (users model)
          localField: "manager", // field in db "admin".ref. (cars model)
          foreignField: "_id", // id of admin
          as: "manager", // name how in localField
        },
      },
      {
        $unwind: {
          // structure array of admin is off
          path: "$manager",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return result[0];
  }
}

export const userRepository = new OrderRepository();

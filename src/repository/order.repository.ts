import { Types } from "mongoose";

import { Order } from "../models/Order.model";
import { IOrder } from "../types/order.types";

class OrderRepository {
  public async getByAdminAndUser(
    userId: string,
    adminId: string
  ): Promise<IOrder> {
    const result = await Order.aggregate([
      {
        $match: {
          // search for adminId and userId
          _id: userId,
          admin: new Types.ObjectId(adminId),
        },
      },
      {
        $lookup: {
          from: "admins", // model in db "admins" (users model)
          localField: "admin", // field in db "admin".ref. (cars model)
          foreignField: "_id", // id of admin
          as: "admin", // name how in localField
        },
      },
      {
        $unwind: {
          // structure array of admin is off
          path: "$admin",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return result[0];
  }
}

export const userRepository = new OrderRepository();

import { Types } from "mongoose";

import { ApiError } from "../errors/api.error";
import { Order } from "../models/Order.model";
import { userRepository } from "../repository/order.repository";
import { IOrder } from "../types/order.types";
import { IPaginationResponse, IQuery } from "../types/pagination.types";

class OrderService {
  public async getPagination(query: IQuery): Promise<IPaginationResponse<any>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        limit = 25,
        sort = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);
      const orders = await Order.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .lean();
      const ordersCount = await Order.count();

      return {
        page: +page,
        perPage: +limit,
        valueCount: ordersCount,
        valueFound: orders.length,
        data: orders,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(orderId: string, adminId: string): Promise<IOrder> {
    try {
      return await userRepository.getByAdminAndUser(orderId, adminId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: IOrder, adminId: string) {
    try {
      return await Order.create({
        ...data,
        admin: new Types.ObjectId(adminId),
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(id: string, body: object) {
    try {
      return Order.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const orderService = new OrderService();

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

      // --

      const {
        page = 1,
        limit = 25,
        sort = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);
      const cars = await Order.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .lean();
      const carsCount = await Order.count();

      return {
        page: +page,
        perPage: +limit,
        valueCount: carsCount,
        valueFound: cars.length,
        data: cars,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(userId: string, adminId: string): Promise<IOrder> {
    try {
      return await userRepository.getByAdminAndUser(userId, adminId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: IOrder, adminId: string) {
    try {
      return await Order.create({ ...data, admin: new Types.ObjectId(adminId) });
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

  public async delete(id: string) {
    try {
      return Order.deleteOne({ _id: id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const orderService = new OrderService();

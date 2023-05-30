import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { userRepository } from "../repository/user.repository";
import { IPaginationResponse, IQuery } from "../types/pagination.types";
import { IUser } from "../types/user.types";
import {Types} from "mongoose";

class UserService {
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
      const cars = await User.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .lean();
      const carsCount = await User.count();

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

  public async getById(userId: string, adminId: string): Promise<IUser> {
    try {
      return await userRepository.getByAdminAndUser(userId, adminId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: IUser, adminId: string) {
    try {
      return await User.create({ ...data, user: new Types.ObjectId(adminId) });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(id: string, body: object) {
    try {
      return User.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(id: string) {
    try {
      return User.deleteOne({ _id: id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();

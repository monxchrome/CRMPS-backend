import { ApiError } from "../errors";
import { Group } from "../models/Group.model";
import { IGroup, IPaginationResponse, IQuery } from "../types";

class GroupService {
  public async getPagination(query: IQuery): Promise<IPaginationResponse<any>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        limit = 10,
        sort = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);

      const groups = await Group.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .lean();
      const groupsCount = await Group.count();

      return {
        page: +page,
        perPage: +limit,
        valueCount: groupsCount,
        valueFound: groups.length,
        data: groups,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(orderId: string, data: IGroup) {
    try {
      const group = await Group.create(data);

      await Group.updateOne({ _id: orderId }, { group: group });

      return group;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const groupService = new GroupService();

import { Types } from "mongoose";

import { IAdmin } from "./admin.types";

export interface IComment {
  _id?: string;
  title: string;
  user: IAdmin | Types.ObjectId;
}

import { Types } from "mongoose";

import { IAdmin } from "./admin.types";

export interface IComment {
  title: string;
  user: IAdmin | Types.ObjectId;
}

import { Types } from "mongoose";

import { IAdmin } from "./admin.types";
import {IComment} from "./comment.types";

export interface IOrder {
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  course_format: string;
  status: string;
  sum: number;
  alreadyPaid: number;
  manager: IAdmin | Types.ObjectId;
  comments: IComment | Types.ObjectId;
}

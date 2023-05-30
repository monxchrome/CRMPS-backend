import { model, Schema, Types } from "mongoose";

import { ECourse } from "../enums/course.enum";
import { ECourseFormat } from "../enums/courseFormat.enum";
import { ECourseType } from "../enums/courseType.enum";
import { EStatus } from "../enums/status.enum";
import { Admin } from "./Admin.model";

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      default: null,
    },
    surname: {
      type: String,
      required: false,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      required: false,
      default: null,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
      required: false,
      default: null,
      trim: true,
    },
    age: {
      type: Number,
      required: false,
      default: null,
    },
    course: {
      type: String,
      enum: ECourse,
      required: false,
      default: null,
    },
    course_format: {
      type: String,
      enum: ECourseFormat,
      required: false,
      default: null,
    },
    course_type: {
      type: String,
      enum: ECourseType,
      required: false,
      default: null,
    },
    status: {
      type: String,
      enum: EStatus,
      required: false,
      default: null,
    },
    sum: {
      type: Number,
      required: false,
      default: null,
    },
    alreadyPaid: {
      type: Number,
      required: false,
      default: null,
    },
    group: {
      type: String,
      required: false,
      default: null,
      unique: true,
    },
    manager: {
      type: Types.ObjectId,
      required: false,
      default: null,
      ref: Admin,
    },
  },
  { versionKey: false, timestamps: true }
);

export const User = model("user", userSchema);

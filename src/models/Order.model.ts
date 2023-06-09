import { model, Schema, Types } from "mongoose";

import { ECourse, ECourseFormat, ECourseType, EStatus } from "../enums";
import { Admin } from "./Admin.model";
import { Comment } from "./Comment.model";

export const orderSchema = new Schema(
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
      required: [true, "REF: Manager is required"],
      ref: Admin,
    },
    comments: {
      type: Types.ObjectId,
      ref: Comment,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Order = model("order", orderSchema);

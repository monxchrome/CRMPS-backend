import { model, Schema, Types } from "mongoose";

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
      required: false,
      default: null,
    },
    course_format: {
      type: String,
      required: false,
      default: null,
    },
    status: {
      type: String,
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

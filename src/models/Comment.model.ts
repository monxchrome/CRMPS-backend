import { model, Schema, Types } from "mongoose";

import { Admin } from "./Admin.model";

export const commentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    user: {
      type: Types.ObjectId,
      required: [true, "REF user is required"],
      ref: Admin,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Comment = model("comment", commentSchema);

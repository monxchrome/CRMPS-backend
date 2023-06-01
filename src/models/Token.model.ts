import { model, Schema, Types } from "mongoose";

import { Admin } from "./Admin.model";

const tokenSchema = new Schema(
  {
    _admin_id: {
      type: Types.ObjectId,
      required: true,
      ref: Admin,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Token = model("Token", tokenSchema);

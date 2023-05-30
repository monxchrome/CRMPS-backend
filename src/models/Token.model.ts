import { model, Schema, Types } from "mongoose";

import { Order } from "./Order.model";

const tokenSchema = new Schema(
  {
    _admin_id: {
      type: Types.ObjectId,
      required: true,
      ref: Order,
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

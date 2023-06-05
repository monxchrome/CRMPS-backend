import { model, Schema } from "mongoose";

export const groupSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Group = model("group", groupSchema);

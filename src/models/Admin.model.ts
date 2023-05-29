import {model, Schema} from "mongoose";

export const adminSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

export const Admin = model("admin", adminSchema);

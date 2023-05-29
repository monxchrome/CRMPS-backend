import { model, Schema } from "mongoose";

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Phone is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
    },
    course_format: {
      type: String,
      required: [true, "Course Format is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
    },
    sum: {
      type: Number,
      required: [true, "Sum is required"],
    },
    alreadyPaid: {
      type: Number,
      required: [true, "Already Paid is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

export const User = model("user", userSchema);

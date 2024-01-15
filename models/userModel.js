import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = model("User", userSchema);

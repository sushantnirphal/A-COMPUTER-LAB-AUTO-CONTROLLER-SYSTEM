import { model, Schema } from "mongoose";

const AdminSchema = new Schema(
  {
    id: {
      type: String,
      default: process.env.ADMIN,
    },
    password: {
      type: String,
      default: process.env.PASS,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

export default model("admin", AdminSchema);
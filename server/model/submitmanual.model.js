import {model, Schema} from "mongoose";

const submitmanualSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    prn: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    aim: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    sem: {
      type: Number,
      required: true,
    },
    file_type: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

export default model("submitmanual", submitmanualSchema);

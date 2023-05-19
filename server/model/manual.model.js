import {model, Schema} from "mongoose";

const manualSchema = new Schema(
  {
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
    year: {
      type: Number,
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
    test_case: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {timestamps: true}
);

export default model("manual", manualSchema);

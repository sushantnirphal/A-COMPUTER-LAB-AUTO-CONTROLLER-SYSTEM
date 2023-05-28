import {model, Schema} from "mongoose";

const syllabusSchema = new Schema(
  {
    subject: {
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
);

export default model("syllabus", syllabusSchema);



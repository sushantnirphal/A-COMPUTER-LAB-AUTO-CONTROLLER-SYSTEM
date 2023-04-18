import {model, Schema} from "mongoose";

const facultySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  profile: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: String,
});

export default model("faculty", facultySchema);

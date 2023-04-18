import {model, Schema} from "mongoose";

const studentSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  prn: {
    type: String,
    required: true,
    unique : true
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
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

export default model("student", studentSchema);

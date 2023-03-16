import  { model, Schema } from "mongoose";

const studentSchema = Schema({
  name: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  prn: {
    type: "String",
    required: true,
  },
  year: {
    type: "Number",
    required: true,
  },
  semester: {
    type: "Number",
    required: true,
  },
  dob: {
    type: "Date",
    required: true,
  },
  address: {
    type: "String",
    required: true,
  },
  branch: {
    type: "String",
    required: true,
  },
  photo: {
    type: "String",
    required: true,
  },
  phone: {
    type: "String",
    required: true,
  },
});

export default model('student' , studentSchema)
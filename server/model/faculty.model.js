import  { model, Schema } from "mongoose";

const facultySchema = Schema({
  name: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  username: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  
  profile: {
    type: "String",
    required: true,
  },
  phone: {
    type: "String",
    required: true,
  },
});

export default model('faculty' , facultySchema)
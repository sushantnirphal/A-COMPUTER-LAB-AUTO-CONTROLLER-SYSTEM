import {model, Schema} from "mongoose";
const otpSchema = Schema({
    email: {
      type: String,
      required: true,
      unique : true
    },
    code: {
      type: String,
      required: true,
      unique : true
    },
    expireIn: {
      type: Number,
      required: true,
    },
  },
    {timestamps: true}
  );
  
  export default model("otp", otpSchema,"otp");
  
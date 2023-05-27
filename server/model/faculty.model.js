import {model, Schema} from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const keysecret = process.env.SECRET_KEY;

const facultySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  year: Number,
  semester: Number,
  password: String,
  profile: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  verifytoken: {
    type: String,
  },
});

// Generate authentication token
facultySchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({_id: this._id.toString()}, keysecret, {
      expiresIn: "1d",
    });

    this.tokens = this.tokens.concat({token});
    await this.save();

    return token;
  } catch (error) {
    throw new Error("Failed to generate authentication token");
  }
};

export default model("faculty", facultySchema);

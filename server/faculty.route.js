import express from "express";
import jwt from "jsonwebtoken";

import facultyModel from "./model/faculty.model.js"
const facultyRouter = express.Router();
facultyRouter.get("/", async (req, res) => {
  const faculties = await facultyModel.find();
  res.json(faculties);
});

facultyRouter.post("/enroll", async (req, res) => {
  const {payload} = req.body;
  if (!payload) {
    return res.status(400).send({success: true, message: "All fieds needed."});
  }
  const akg = await facultyModel.create(payload);
  res.status(200).send({success: true, message: "Created", akg});
});

facultyRouter.post("/login", async (req, res) => {
  const {username, password} = req.body;
  try {
    const faculty = await facultyModel.findOne({username, password});
    const token = jwt.sign({username, name: faculty.name}, process.env.JWT_SECRET);
    if (faculty) {
      // User found, return success response
      return res
        .setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`)
        .status(200)
        .json({success: true, message: "User found", data: faculty});
    } else {
      // User not found, return error response
      return res.status(404).json({success: false, message: "User not found"});
    }
  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({success: false, message: "Server error"});
  }
});
export default facultyRouter;

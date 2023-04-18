import express from "express";
import jwt from "jsonwebtoken";

import facultyModel from "./model/faculty.model.js";
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
  try {
    const akg = await facultyModel.create({...payload, role: "teacher"});
    res.status(200).send({success: true, message: "Created", akg});
  } catch (error) {
    res
      .status(200)
      .send({success: false, message: "Email or phone already exist"});
  }
});

facultyRouter.post("/login", async (req, res) => {
  const {email, password} = req.body;
  try {
    const faculty = await facultyModel.findOne({email, password});
    if (faculty) {
      faculty.role = "faculty";
      const token = jwt.sign(
        {email, name: faculty.name},
        process.env.JWT_SECRET
      );
      // User found, return success response
      return res
        .setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`)
        .status(200)
        .json({success: true, message: "User found", data: faculty});
    } else {
      // User not found, return error response
      return res
        .status(404)
        .json({success: false, message: "Faculty not found"});
    }
  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({success: false, message: "Server error"});
  }
});
export default facultyRouter;

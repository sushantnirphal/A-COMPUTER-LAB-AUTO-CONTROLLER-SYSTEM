import express from "express";
import studentModel from "../model/student.model.js";
const studentRouter = express.Router();
studentRouter.get("/", async (req, res) => {
  const students = await studentModel.find();
  res.json(students);
});

studentRouter.post("/login", async (req, res) => {
  const {prn, phone} = req.body;
  try {
    const student = await studentModel.findOne({prn, phone});

    if (student) {
      student.role = "student";
      // User found, return success response
      return res
        .status(200)
        .json({
          success: true,
          message: "User found",
          student: student,
        });
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
export default studentRouter;

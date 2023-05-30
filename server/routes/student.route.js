import express from "express";
import studentModel from "../model/student.model.js";
import manualModel from "../model/manual.model.js";

const studentRouter = express.Router();

//email config

studentRouter.get("/", async (req, res) => {
  const students = await studentModel.find();
  res.json(students);
});

studentRouter.get("/no-photo", async (req, res) => {
  const students = await studentModel.find({}, {profile: 0});
  res.json(students);
});
studentRouter.get("/:id", async (req, res) => {
  const students = await studentModel.find({_id: req.params.id}, {profile: 0});
  res.json(students);
});

studentRouter.post("/enroll", async (req, res) => {
  const {payload} = req.body;
  if (!payload) {
    return res.status(400).send({success: true, message: "All fields needed."});
  }
  const akg = await studentModel.create({...payload, role: "student"});
  res.status(200).send({success: true, message: "Created", akg});
});

studentRouter.post("/login", async (req, res) => {
  const {prn, phone} = req.body;
  try {
    const student = await studentModel.findOne({prn, phone});

    if (student) {
      student.role = "student";
      // User found, return success response
      return res.status(200).json({
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

// attendence router
studentRouter.post("/attendence/:id/:pid", async (req, res) => {
  const {id, pid} = req.params;

  try {
    const {aim, practical_no} = await manualModel.findOne(
      {_id: pid},
      {aim: 1, practical_no: 1}
    );
    const student = await studentModel.updateOne(
      {_id: id},
      {
        $push: {
          practical_completed: {
            pid: pid,
            attendence_status: "present",
            date: Date.now(),
            aim,
            practical_no,
            status: null,
            marks: 0,
            test_cases_passed: 0,
          },
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Attendence marked",
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({success: false, message: "Server error"});
  }
});

// check attendence router
studentRouter.get("/check-attendence/:id/:pid", async (req, res) => {
  const {id, pid} = req.params;
  try {
    const data = await studentModel.findOne({
      _id: id,
      practical_completed: {$elemMatch: {pid: pid}},
    });
    console.log(data);

    return res.status(200).json({
      success: !!data,
      message: data ? "Attendence marked" : "Attendence not marked",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({success: false, message: "Server error"});
  }
});

// Attendence status router
studentRouter.get("/attendence-status/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const data = await studentModel.findOne(
      {prn: id},
      {
        _id: 0,
        practical_completed: {
          aim: 1,
          practical_no: 1,
          marks: 1,
          attendence_status: 1,
          status: 1,
        },
      }
    );
    console.log(data);
    return res.status(200).json({
      success: !!data,
      message: "Attendence featched",
      data: data.practical_completed || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({success: false, message: "Server error"});
  }
});

export default studentRouter;

import express from "express";
import studentModel from "../model/student.model.js";
import manualModel from "../model/manual.model.js";

const studentRouter = express.Router();

studentRouter.get("/", async (req, res) => {
  try {
    const students = await studentModel.find().select("-practical_completed");
    return res.status(200).json({
      error: false,
      data: students,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

studentRouter.get("/:year/:semester", async (req, res) => {
  const { semester, year } = req.params;
  if (!year || !semester) {
    return res
      .status(400)
      .json({ error: true, message: "Please enter valid year and semester." });
  }
  try {
    const students = await studentModel.find(
      {
        year,
        semester,
      },
      {
        profile: 0,
      }
    );
    res.json(students);
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Error in fetching attendence.",
    });
  }
});

studentRouter.get("/no-photo", async (req, res) => {
  const students = await studentModel.find({}, { profile: 0 });
  res.json(students);
});

studentRouter.get("/:id", async (req, res) => {
  const { all } = req.query;
  try {
    const students = await studentModel
      .findOne({ _id: req.params.id })
      .select(!all ? "-profile" : "");

    res.status(200).json(students);
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: "Error while getting student profile." });
  }
});

studentRouter.post("/enroll", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    if (!req.files?.profile) {
      return res
        .status(400)
        .send({ success: true, message: "All fields needed." });
    }
    const profile = req.files.profile;
    const file = payload.prn + "_profile_picture_" + ".png";
    const path = `${process.env.PROFILE_PIC_PATH}/${file}`;
    profile.mv(path, (error) => console.log(error));
    const akg = await studentModel.create({
      ...payload,
      name: payload.fname + " " + payload.lname,
      role: "student",
      profile: process.env + "/static/profile/" + file,
    });

    res.status(200).send({ success: true, message: "Created", akg });
  } catch (error) {
    return res.status(400).send({ success: true, message: "Server error." });
  }
});

studentRouter.post("/login", async (req, res) => {
  const { prn, phone } = req.body;
  try {
    const student = await studentModel.findOne({ prn, phone });

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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// attendence router
studentRouter.post("/attendence/:id/:pid", async (req, res) => {
  const { id, pid } = req.params;

  try {
    const { aim, practical_no } = await manualModel.findOne(
      { _id: pid },
      { aim: 1, practical_no: 1 }
    );
    const student = await studentModel.updateOne(
      { _id: id },
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
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// check attendence router
studentRouter.get("/check/attendence/:id/:pid", async (req, res) => {
  const { id, pid } = req.params;
  try {
    const data = await studentModel.findOne({
      _id: id,
      practical_completed: { $elemMatch: { pid: pid } },
    });
    console.log(data);

    return res.status(200).json({
      success: !!data,
      message: data ? "Attendence marked" : "Attendence not marked",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Attendence status router
studentRouter.get("/prn/attendence-status/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await studentModel.findOne(
      { prn: id },
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
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// submit manual
studentRouter.post("/submit-manual", async (req, res) => {
  const { _id } = req.body;
  if (!req.files) {
    return res.status(400).json({
      error: true,
      message: "Please upload file.",
    });
  }

  const manual = req.files.manual;
  const file = _id + "_practical_manual_" + ".pdf";
  const path = `${process.env.MANUAL_FILE_PATH}/${file}`;
  try {
    manual.mv(path, (error) => console.log(error));
    const student = await studentModel.findOneAndUpdate(
      {
        "practical_completed._id": _id,
      },
      {
        $set: {
          "practical_completed.$.manual.url": file,
          "practical_completed.$.manual.uploaded_on": Date.now(),
        },
      }
    );
    return res.status(200).json({
      error: false,
      message: "Manual submitted successfully.",
      data: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: true,
      message: "Manual submission failed.",
    });
  }
});

export default studentRouter;

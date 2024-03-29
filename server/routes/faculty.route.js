import express from "express";
import jwt from "jsonwebtoken";
import facultyModel from "../model/faculty.model.js";
import nodemailer from "nodemailer";
import studentModel from "../model/student.model.js";
const keysecret = process.env.SECRET_KEY;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "malikarpriyanka@gmail.com",
    pass: "1234567",
  },
});

const facultyRouter = express.Router();

facultyRouter.get("/", async (req, res) => {
  try {
    const faculties = await facultyModel.find();
    res.status(200).json({
      error: false,
      data: faculties,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "Server error." });
  }
});

facultyRouter.get("/me/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const me = await facultyModel.findById(_id);
    res.status(200).json({ error: false, data: me });
  } catch (error) {
    res.status(500).json({ error: true, message: "Server error." });
  }
});

facultyRouter.post("/enroll", async (req, res) => {
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
    const akg = await facultyModel.create({
      ...payload,
      name: payload.fname + " " + payload.lname,
      role: "student",
      profile: "http://localhost:7890/static/profile/" + file,
    });

    res.status(200).send({ success: true, message: "Created", akg });
  } catch (error) {
    return res.status(400).send({ success: true, message: "Server error." });
  }

});

facultyRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const faculty = await facultyModel.findOne({ email, password });
    if (faculty) {
      faculty.role = "faculty";
      const token = jwt.sign(
        { email, name: faculty.name },
        process.env.JWT_SECRET
      );
      // User found, return success response
      return res
        .setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`)
        .status(200)
        .json({ success: true, message: "User found", data: faculty });
    } else {
      // User not found, return error response
      return res
        .status(404)
        .json({ success: false, message: "Faculty not found" });
    }
  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

//send email link for reset password
facultyRouter.post("/sendpasswordlink", async (req, res) => {
  console.log(req.body);
  // Implement your email sending logic here
  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const userfind = await facultyModel.findOne({ email: email });
    // console.log("userfind",userfind)
    // token generate for reset password
    const token = jwt.sign({ _id: userfind._id }, keysecret, {
      expiresIn: "120s",
    });

    const setusertoken = await facultyModel.findByIdAndUpdate(
      { _id: userfind._id },
      { verifytoken: token },
      { new: true }
    );

    if (setusertoken) {
      const mailOptions = {
        from: "malikarpriyanka@gmail.com",
        to: email,
        subject: "Sending Email For password Reset",
        text: `This Link Valid For 2 MINUTES http://localhost:7890/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent Succsfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
});

facultyRouter.get("/get-attendance/:year/:semester", async (req, res) => {
  const { year, semester } = req.params;
  console.log(year, semester);
  try {
    const attendance = await studentModel.find(
      { year: Number(year), semester: Number(semester) },
      {
        name: 1,
        prn: 1,
        year: 1,
        semester: 1,
        practical_completed: 1,
      }
    );

    res
      .status(200)
      .json({ error: false, message: "Attendance", data: attendance });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Somethong went wrong" });
  }
});

export default facultyRouter;

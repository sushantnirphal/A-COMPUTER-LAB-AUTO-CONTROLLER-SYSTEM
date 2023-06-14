import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import studentRouter from "./routes/student.route.js";
import facultyRouter from "./routes/faculty.route.js";
import ManualRouter from "./routes/manual.route.js";
import SyllabusRouter from "./routes/syllabus.route.js";
import express_fileupload from "express-fileupload";
import AdminRouter from "./routes/admin.route.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 7890;
app.use(express_fileupload({}));
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "HEAD", "PATCH", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    limit: "50mb",
  })
);

app.use("/static", express.static("assets/"));

// router handlers
app.use("/student", studentRouter);
app.use("/faculty", facultyRouter);
app.use("/admin", AdminRouter);
app.use("/api/manual", ManualRouter);
app.use("/api/syllabus", SyllabusRouter);

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("MongoAtlas connected!");
  app.listen(PORT, (serverError) => {
    serverError && console.log(serverError);
    console.log(`server is running at : http://localhost:${PORT}`);
  });
} catch (error) {
  console.log("error while connecting to db", error);
}

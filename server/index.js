import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import studentRouter from "./routes/student.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7890;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({
  limit : '50mb'
}));
app.use(express.urlencoded({extended: true}));

// router handlers
app.use("/student", studentRouter);

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("MongoAtlas connected!");
  app.listen(PORT, (serverError) => {
    serverError && console.log(serverError);
    console.log(`server is running at : http:localhost:${PORT}`);
  });
} catch (error) {
  console.log("error while connecting to db", error);
}

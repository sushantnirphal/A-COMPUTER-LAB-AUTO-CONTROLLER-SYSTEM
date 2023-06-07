import { Router } from "express";
import manualModel from "../model/manual.model.js";
import SubmittedManual from "../model/submitmanual.model.js";
import submitmanualModel from "../model/submitmanual.model.js";
import adminModel from "../model/admin.model.js";
const AdminRouter = Router();

// get all manuals
AdminRouter.post("/login", async (req, res) => {
  try {
    const { id, password } = req.body;
    const akg = await adminModel.findOne({
      id,
      password,
    });
    if (!akg) {
      return res.status(400).json({
        success: false  ,
        message: "Bad credentials",
      });
    }
    res.status(200).send({
      success: true,
      message: "Login successfull",
      admin: akg,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong.", data: error });
  }
});

export default AdminRouter;

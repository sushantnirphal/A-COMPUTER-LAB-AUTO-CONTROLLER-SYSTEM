import {Router} from "express";
import manualModel from "../model/manual.model.js";

const ManualRouter = Router();

// get all manuals
ManualRouter.get("/", async (req, res) => {
  try {
    const akg = await manualModel.find();

    res
      .status(200)
      .send({success: true, message: "Manual fetched successfully", data: akg});
  } catch (error) {
    const akg = await manualModel.create(payload);

    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

// get manual ids
ManualRouter.get("/all_id", async (req, res) => {
  try {
    const akg = await manualModel.find({}, {_id: 1});

    res
      .status(200)
      .send({success: true, message: "Manual fetched successfully", data: akg});
  } catch (error) {
    const akg = await manualModel.create(payload);

    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

// get manual by id
ManualRouter.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const akg = await manualModel.find({_id: id});
    res
      .status(200)
      .send({success: true, message: "Manual fetched successfully", data: akg});
  } catch (error) {
    const akg = await manualModel.create(payload);

    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

ManualRouter.post("/", async (req, res) => {
  const payload = req.body;
  payload.slug = payload.aim.toLowerCase().replace("/ /", "-");
  if (!payload) {
    res
      .status(400)
      .send({success: false, message: "required fields missing", data: null});
  }
  try {
    const akg = await manualModel.create(payload);
    console.log(akg);
    res
      .status(200)
      .send({success: true, message: "Manual added successfully", data: akg});
  } catch (error) {
    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

export default ManualRouter;

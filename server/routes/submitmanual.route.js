import {Router} from "express";
import submitmanualModel from "../model/submitmanual.model.js";

const SubmitManualRouter = Router();

// get all manuals
SubmitManualRouter.get("/", async (req, res) => {
  try {
    const akg = await submitmanualModel.find();

    res
      .status(200)
      .send({success: true, message: "Manual fetched successfully", data: akg});
  } catch (error) {
    const akg = await submitmanualModel.create(payload);

    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

// get manual ids
SubmitManualRouter.get("/all_id", async (req, res) => {
  try {
    const akg = await submitmanualModel.find(
      {},
      {
        _id: 1,
        aim: 1,
        createdAt: 1,
        file_type: 1,
        sem: 1,
        name: 1,
        prn: 1,
      }
    );

    res
      .status(200)
      .send({success: true, message: "Manual fetched successfully", data: akg});
  } catch (error) {
    const akg = await submitmanualModel.create(payload);

    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

// get manual ids
SubmitManualRouter.get("/file/:id", async (req, res) => {
  const {id} = req.params;
  console.log("here", id);
  try {
    const akg = await submitmanualModel.findOne(
      {_id: id},
      {
        file: 1,
        file_type: 1,
      }
    );
    console.log(akg);
    res
      .status(200)
      .send({success: true, message: "Manual fetched successfully", data: akg});
  } catch (error) {
    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

// get manual by id
SubmitManualRouter.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const akg = await submitmanualModel.findOne({_id: id});
    res
      .status(200)
      .send({success: true, message: "Manual fetched successfully", data: akg});
  } catch (error) {
    const akg = await submitmanualModel.create(payload);

    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

SubmitManualRouter.post("/", async (req, res) => {
  const payload = req.body;
  payload.slug = payload.aim.toLowerCase().replace("/ /", "-");
  if (!payload) {
    res
      .status(400)
      .send({success: false, message: "required fields missing", data: null});
  }
  try {
    const akg = await submitmanualModel.create(payload);

    res
      .status(200)
      .send({success: true, message: "Manual added successfully", data: akg});
  } catch (error) {
    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

// delete manual by id
SubmitManualRouter.post("/delete/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const akg = await submitmanualModel.deleteOne({_id: id});
    res
      .status(200)
      .send({success: true, message: "Manual deleted successfully", data: akg});
  } catch (error) {
    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});
export default SubmitManualRouter;

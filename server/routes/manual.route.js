import { Router } from "express";
import manualModel from "../model/manual.model.js";
import SubmittedManual from "../model/submitmanual.model.js";
import submitmanualModel from "../model/submitmanual.model.js";
const ManualRouter = Router();

// get all manuals
ManualRouter.get("/", async (req, res) => {
  try {
    const akg = await manualModel.find();

    res.status(200).send({
      success: true,
      message: "Manual fetched successfully",
      data: akg,
    });
  } catch (error) {
    const akg = await manualModel.create(payload);

    res
      .status(400)
      .send({ success: false, message: "Something went wrong.", data: error });
  }
});

// get manual ids
ManualRouter.get("/all_id", async (req, res) => {
  console.log(req.params);
  if (!req.params.year || !req.params.semester) {
    return res
      .status(400)
      .send({ success: false, message: "All fieds needed." });
  }

  try {
    const akg = await manualModel.find(
      {
        year: req.params.year,
        semester: req.params.semester,
      },
      {
        _id: 1,
        aim: 1,
        createdAt: 1,
        file_type: 1,
        sem: 1,
        year: 1,
        input: 1,
        output: 1,
      }
    );

    res.status(200).send({
      success: true,
      message: "Manual fetched successfully",
      data: akg,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong.", data: error });
  }
});

// get manual ids
ManualRouter.get("/all_id/:year/:semester", async (req, res) => {
  if (!req.params.year || !req.params.semester) {
    return res
      .status(400)
      .send({ success: false, message: "All fieds needed." });
  }

  try {
    const akg = await manualModel.find(
      {
        year: req.params.year,
        semester: req.params.semester,
      },
      {
        _id: 1,
        aim: 1,
        createdAt: 1,
        file_type: 1,
        semester: 1,
        slot_date:1,
        year: 1,
        practical_no: 1,
        test_case: 1,
      }
    );

    res.status(200).send({
      success: true,
      message: "Manual fetched successfully",
      data: akg,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong.", data: error });
  }
});

// get manual ids
ManualRouter.get("/file/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const akg = await manualModel.findOne(
      { _id: id },
      {
        file: 1,
        file_type: 1,
      }
    );

    res.status(200).send({
      success: true,
      message: "Manual fetched successfully",
      data: akg,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong.", data: error });
  }
});

// get submitted manual by id
ManualRouter.get("/submitted/file/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const akg = await submitmanualModel.findOne(
      { _id: id },
      {
        file: 1,
        file_type: 1,
      }
    );
    res.status(200).send({
      success: true,
      message: "Manual fetched successfully",
      data: akg,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong.", data: error });
  }
});

// get manual by id
ManualRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const akg = await manualModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      message: "Manual fetched successfully",
      data: akg,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong.", data: error });
  }
});

// get testcases by id
ManualRouter.post("/test-cases/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const akg = await manualModel.findOne(
      { _id: id },
      {
        test_case: 1,
      }
    );
    res.status(200).send({
      success: true,
      message: "Manual fetched successfully",
      data: akg.test_case,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong.", data: error });
  }
});


// create manual
ManualRouter.post("/", async (req, res) => {
  const payload = req.body;
  payload.slug = payload.aim.toLowerCase().replace(/ /g, "-");
  if (!payload) {
    res
      .status(400)
      .send({ success: false, message: "required fields missing", data: null });
  }
  try {
    const akg = await manualModel.create(payload);

    res
      .status(200)
      .send({ success: true, message: "Manual added successfully", data: akg });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong.", data: error });
  }
});

// delete manual by id
ManualRouter.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const akg = await manualModel.deleteOne({ _id: id });
    res.status(200).send({
      success: true,
      message: "Manual deleted successfully",
      data: akg,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong.", data: error });
  }
});
export default ManualRouter;

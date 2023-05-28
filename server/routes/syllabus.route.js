import {Router} from "express";
import syllabusModel from "../model/syllabus.model.js";


const SyllabusRouter = Router();

// get all syllabus
SyllabusRouter.get("/", async (req, res) => {
  try {
    const akg = await syllabusModel.find();

    res
      .status(200)
      .send({success: true, message: "Syllabus fetched successfully", data: akg});
  } catch (error) {
    const akg = await syllabusModel.create(payload);

    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

// get syllabus ids
SyllabusRouter.get("/all_id", async (req, res) => {
  try {
    const akg = await syllabusModel.find(
      {},
      {
        _id: 1,
        subject: 1,
        createdAt: 1,
        file_type: 1,
        sem: 1,        
      }
    );

    res
      .status(200)
      .send({success: true, message: "Syllabus fetched successfully", data: akg});
  } catch (error) {
   

    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

// get syllabus ids
SyllabusRouter.get("/file/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const akg = await syllabusModel.findOne(
      {_id: id},
      {
        file: 1,
        file_type: 1,
      }
    );
    res
      .status(200)
      .send({success: true, message: "Syllabus fetched successfully", data: akg});
  } catch (error) {
   
    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

// get syllabus by id
SyllabusRouter.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const akg = await syllabusModel.findOne({_id: id});
    res
      .status(200)
      .send({success: true, message: "Syllabus fetched successfully", data: akg});
  } catch (error) {
  
    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});


// get testcases by id
SyllabusRouter.post("/test-cases/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const akg = await syllabusModel.findOne({_id: id} , {
      test_case: 1,
    });
    res
      .status(200)
      .send({success: true, message: "Syllabus fetched successfully", data: akg.test_case});
  } catch (error) {
  
    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

SyllabusRouter.post("/", async (req, res) => {
  const payload = req.body;
  payload.slug = payload.subject.toLowerCase().replace("/ /", "-");
  if (!payload) {
    res
      .status(400)
      .send({success: false, message: "required fields missing", data: null});
  }
  try {
    const akg = await syllabusModel.create(payload);

    res
      .status(200)
      .send({success: true, message: "Syllabus added successfully", data: akg});
  } catch (error) {
    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});

// delete syllabus by id
SyllabusRouter.post("/delete/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const akg = await syllabusModel.deleteOne({_id: id});
    res
      .status(200)
      .send({success: true, message: "Syllabus deleted successfully", data: akg});
  } catch (error) {
    res
      .status(400)
      .send({success: false, message: "Something went wrong.", data: error});
  }
});
export default SyllabusRouter;

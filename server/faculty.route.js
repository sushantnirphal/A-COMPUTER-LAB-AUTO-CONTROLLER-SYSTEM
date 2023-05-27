import express from "express";
import jwt from "jsonwebtoken";
import facultyModel from "./model/faculty.model.js";
import nodemailer from "nodemailer";
const keysecret = process.env.SECRET_KEY

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
      user:"malikarpriyanka@gmail.com",
      pass:"1234567"
  }
}) 


const facultyRouter = express.Router();
facultyRouter.get("/", async (req, res) => {
  const faculties = await facultyModel.find();
  res.json(faculties);
});

facultyRouter.post("/enroll", async (req, res) => {
  const {payload} = req.body;
  if (!payload) {
    return res.status(400).send({success: true, message: "All fieds needed."});
  }
  try {
    const akg = await facultyModel.create({...payload, role: "teacher"});
    res.status(200).send({success: true, message: "Created", akg});
  } catch (error) {
    res
      .status(200)
      .send({success: false, message: "Email or phone already exist"});
  }
});

facultyRouter.post("/login", async (req, res) => {
  const {email, password} = req.body;
  try {
    const faculty = await facultyModel.findOne({email, password});
    if (faculty) {
      faculty.role = "faculty";
      const token = jwt.sign(
        {email, name: faculty.name},
        process.env.JWT_SECRET
      );
      // User found, return success response
      return res
        .setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`)
        .status(200)
        .json({success: true, message: "User found", data: faculty});
    } else {
      // User not found, return error response
      return res
        .status(404)
        .json({success: false, message: "Faculty not found"});
    }
  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({success: false, message: "Server error"});
  }
});

//send email link for reset password
facultyRouter.post("/sendpasswordlink", async (req, res) => {
  console.log(req.body);
  // Implement your email sending logic here
  const {email} = req.body;

  if(!email){
      res.status(401).json({status:401,message:"Enter Your Email"})
  }

  try {
    const userfind = await facultyModel.findOne({email:email});
    // console.log("userfind",userfind)
    // token generate for reset password
    const token = jwt.sign({_id:userfind._id},keysecret,{
      expiresIn:"120s"
  });
  
    const setusertoken = await facultyModel.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


    if(setusertoken){
        const mailOptions = {
            from:"malikarpriyanka@gmail.com",
            to:email,
            subject:"Sending Email For password Reset",
            text:`This Link Valid For 2 MINUTES http://localhost:7890/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
        }

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("error",error);
                res.status(401).json({status:401,message:"email not send"})
            }else{
                console.log("Email sent",info.response);
                res.status(201).json({status:201,message:"Email sent Succsfully"})
            }
        })

    }

} catch (error) {
    res.status(401).json({status:401,message:"invalid user"})
}

});





 
export default facultyRouter;

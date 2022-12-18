const express=require('express');
const corpTraineeRouter=express.Router();
const {getAllCourses,addCourseReview,reqAA,refundRequest,editPassword,getTrainee} =require("../controller/corpTrainee-controller");
corpTraineeRouter.get("/home",getAllCourses);
corpTraineeRouter.post('/addCourseReview/:course',addCourseReview);
corpTraineeRouter.post("/editpassword/:token",editPassword)
corpTraineeRouter.post('/refundRequest',refundRequest);
corpTraineeRouter.post('/reqAA',reqAA);
corpTraineeRouter.get("/getTrainee/:id",getTrainee);
module.exports=corpTraineeRouter;
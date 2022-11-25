const express=require('express');
const corpTraineeRouter=express.Router();
const {getAllCourses,addCourseReview} =require("../controller/corpTrainee-controller");
corpTraineeRouter.get("/home",getAllCourses);
corpTraineeRouter.post('/addCourseReview/:course',addCourseReview);
module.exports=corpTraineeRouter;
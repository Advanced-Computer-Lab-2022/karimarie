const express=require('express');
const corpTraineeRouter=express.Router();
const {getAllCourses,addCourseReview,reqAccess,refundRequest,reqAA} =require("../controller/corpTrainee-controller");
corpTraineeRouter.get("/home",getAllCourses);
corpTraineeRouter.post('/addCourseReview/:course',addCourseReview);
corpTraineeRouter.post('/reqAccess',reqAccess);
corpTraineeRouter.post('/refundRequest',refundRequest);
corpTraineeRouter.post('/reqAA',reqAA);

module.exports=corpTraineeRouter;
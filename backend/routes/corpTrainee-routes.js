const express=require('express');
const corpTraineeRouter=express.Router();
const {getAllCourses,addCourseReview,reqAccess,refundRequest} =require("../controller/corpTrainee-controller");
corpTraineeRouter.get("/home",getAllCourses);
corpTraineeRouter.post('/addCourseReview/:course',addCourseReview);
corpTraineeRouter.post('/reqAccess',reqAccess);
corpTraineeRouter.post('/refundRequest',refundRequest);

module.exports=corpTraineeRouter;
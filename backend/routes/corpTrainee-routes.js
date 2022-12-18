const express=require('express');
const corpTraineeRouter=express.Router();
const {getAllCourses,addCourseReview,reqAA,refundRequest,payForCourse,payForCourseWallet,getById,editPassword,getTrainee} =require("../controller/corpTrainee-controller");
corpTraineeRouter.get("/home",getAllCourses);
corpTraineeRouter.post('/addCourseReview/:course',addCourseReview);
corpTraineeRouter.post("/editpassword/:token",editPassword)
corpTraineeRouter.post('/refundRequest',refundRequest);
corpTraineeRouter.post('/reqAA',reqAA);
corpTraineeRouter.get("/getTrainee/:id",getTrainee);
corpTraineeRouter.get("/getByid/:token",getById)
corpTraineeRouter.post("/payCourse/:id/:currencyPrice", payForCourse);
corpTraineeRouter.post("/payCourseWallet/:id/:id2", payForCourseWallet);
module.exports=corpTraineeRouter;
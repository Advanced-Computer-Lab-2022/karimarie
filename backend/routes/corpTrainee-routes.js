const express=require('express');
const corpTraineeRouter=express.Router();
const {getAllCourses,addCourseReview,reqAA,refundRequest,addP,viewWallet,getProg,payForCourse,payForCourseWallet,getById,editPassword,getTrainee} =require("../controller/corpTrainee-controller");
corpTraineeRouter.get("/home",getAllCourses);
corpTraineeRouter.post('/addCourseReview/:course',addCourseReview);
corpTraineeRouter.post("/editpassword/:token",editPassword)
corpTraineeRouter.post('/refundRequest',refundRequest);
corpTraineeRouter.post('/reqAA',reqAA);
corpTraineeRouter.get("/getTrainee/:id",getTrainee);
corpTraineeRouter.get("/getByid/:token",getById)
corpTraineeRouter.post("/payCourse/:id/:currencyPrice", payForCourse);
corpTraineeRouter.post("/payCourseWallet/:id/:id2", payForCourseWallet);
corpTraineeRouter.post("/addP", addP);
corpTraineeRouter.post("/getProg", getProg);
corpTraineeRouter.post("/viewWallet",viewWallet);
module.exports=corpTraineeRouter;
const express=require('express');
const corpTraineeRouter=express.Router();
const {getAllCourses} =require("../controller/corpTrainee-controller");
corpTraineeRouter.get("/home",getAllCourses);

module.exports=corpTraineeRouter;
const express=require('express');
const instRouter=express.Router();
const instTable=require("../models/Instructor");
const courseTable=require("../models/Course");

const {createCourse, getAllCourses}=require("../controller/inst-controller");

  
    instRouter.post("/",createCourse)
    instRouter.get("/",getAllCourses)
    module.exports=instRouter;

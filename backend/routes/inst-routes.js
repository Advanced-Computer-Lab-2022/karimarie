const express=require('express');
const instRouter=express.Router();
const instTable=require("../models/Instructor");
const courseTable=require("../models/Course");

const {createCourse}=require("../controller/inst-controller");

  
    instRouter.post("/",createCourse)
    module.exports=instRouter;

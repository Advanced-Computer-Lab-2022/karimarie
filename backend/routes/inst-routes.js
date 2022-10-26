const express=require('express');
const instRouter=express.Router();
const courseTable=require("../models/Course");
const {viewAcourse,searchCourse,createCourse}=require("../controller/inst-controller")
//instRouter.post("/login",instLogin)
instRouter.post("/search",searchCourse)
instRouter.post("/addCourse",createCourse)
module.exports=instRouter;


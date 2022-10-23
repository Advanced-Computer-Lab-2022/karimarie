const express=require('express');
const instRouter=express.Router();
const courseTable=require("../models/Course");

const searchCourse=require("../controller/inst-controller");
instRouter.post('/search',searchCourse)
module.exports=instRouter;


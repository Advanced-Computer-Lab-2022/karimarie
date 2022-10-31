const express=require('express');
const instRouter=express.Router();
const courseTable=require("../models/Course");
const {createCourse,getMyCourses,filterMyCPrice,filterMyCSubject,searchInstCourse}=require("../controller/inst-controller")
//instRouter.post("/login",instLogin)
//instRouter.post("/search",searchCourse)
instRouter.post("/addCourse",createCourse)
instRouter.get('/instCourses/:id',getMyCourses);
instRouter.get('/filterMyPrice/:instructor/:price/:currencyFilter',filterMyCPrice);
instRouter.get('/filterMySub/:instructor/:subject',filterMyCSubject);
instRouter.get('/searchTitle/:instructor/:search',searchInstCourse);
module.exports=instRouter;


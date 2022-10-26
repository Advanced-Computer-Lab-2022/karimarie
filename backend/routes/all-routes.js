const express=require('express');
const allRouter=express.Router();
const {getAllCourses,getSubjects,getFilterSubject}=require("../controller/all-controller")
 allRouter.get("/home",getAllCourses);
 allRouter.get("/subjects",getSubjects);
 allRouter.get("/filterS/:subject",getFilterSubject)
// allRouter.get("/home/:id",viewAcourse)
 module.exports=allRouter 
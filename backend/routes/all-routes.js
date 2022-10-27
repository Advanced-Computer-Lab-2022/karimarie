const express=require('express');
const allRouter=express.Router();
const {getAllCourses,getSubjects,getFilterSubject,postFilterPrice,getById}=require("../controller/all-controller")
 allRouter.get("/home",getAllCourses);
 allRouter.get("/subjects",getSubjects);
 allRouter.get("/filterS/:subject",getFilterSubject)
 allRouter.post("/filterP",postFilterPrice)
 allRouter.get("/getByid/:id",getById)
// allRouter.get("/home/:id",viewAcourse)
 module.exports=allRouter 
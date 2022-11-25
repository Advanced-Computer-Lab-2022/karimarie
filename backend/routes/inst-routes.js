const express=require('express');
const instRouter=express.Router();
const courseTable=require("../models/Course");
const {createCourse,getMyCourses,filterMyCPrice,filterMyCSubject,searchInstCourse,getInstructorReviews,getById,editbio,editemail,changepasswordInstructor,sendMailInstructor,createExam,adddiscount}=require("../controller/inst-controller")
//instRouter.post("/login",instLogin)
//instRouter.post("/search",searchCourse)
instRouter.post("/addCourse",createCourse)
instRouter.get('/instCourses/:id',getMyCourses);
instRouter.get('/filterMyPrice/:instructor/:price/:currencyFilter',filterMyCPrice);
instRouter.get('/filterMySub/:instructor/:subject',filterMyCSubject);
instRouter.get('/searchTitle/:instructor/:search',searchInstCourse);
instRouter.get("/getInstructorReviews/:id",getInstructorReviews)
instRouter.get("/getByid/:id",getById)
instRouter.post("/editbio/:id",editbio)
instRouter.post("/editemail/:id",editemail)
instRouter.post("/changepasswordInstructor",changepasswordInstructor)
instRouter.get("/sendMailInstructor",sendMailInstructor)
instRouter.post('/createExam',createExam);
instRouter.post("/adddiscount/:id", adddiscount);
module.exports=instRouter;


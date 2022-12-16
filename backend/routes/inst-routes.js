const express=require('express');
const instRouter=express.Router();
const courseTable=require("../models/Course");
const { requireAuth } = require('../Middleware/authMiddleware');
const {createCourse,getMyCourses,filterMyCPrice,getMyCourses2,getInstructorReviews2,filterMyCSubject,getById2,editPassword,postFilterInstructor,searchInstCourse,getInstructorReviews,getById,editbio,editemail,changepasswordInstructor,sendMailInstructor,createExam,adddiscount}=require("../controller/inst-controller")
//instRouter.post("/login",instLogin)
//instRouter.post("/search",searchCourse)
instRouter.post("/addCourse",createCourse)
instRouter.get('/instCourses/:token',getMyCourses);
instRouter.get('/filterMyPrice/:instructor/:price/:currencyFilter',filterMyCPrice);
instRouter.get('/filterMySub/:instructor/:subject',filterMyCSubject);
instRouter.get('/searchTitle/:token/:search',searchInstCourse);
instRouter.get("/getInstructorReviews/:token",getInstructorReviews)
instRouter.get("/getByid/:token",getById)
instRouter.get("/getByid2/:id",getById2)
instRouter.post("/editpassword/:token",editPassword)
instRouter.post("/editbio/:token",editbio)
instRouter.post("/editemail/:token",editemail)
instRouter.post("/changepasswordInstructor",changepasswordInstructor)
instRouter.get("/sendMailInstructor",sendMailInstructor)
instRouter.post('/createExam',createExam);
instRouter.post("/adddiscount/:id", adddiscount);
instRouter.post("/postFilterInstructor/:token", postFilterInstructor);
instRouter.get('/instCourses2/:id',getMyCourses2);
instRouter.get("/getInstructorReviews2/:id",getInstructorReviews2)

module.exports=instRouter;


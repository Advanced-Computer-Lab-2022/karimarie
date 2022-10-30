const express=require('express');
const allRouter=express.Router();
const {getAllCourses,getSubjects,getFilterSubject,postFilterPrice,getById,filterRating,searchCourse,filterRatingSubject}=require("../controller/all-controller")
 allRouter.get("/home",getAllCourses);
 allRouter.get("/subjects",getSubjects);
 allRouter.get("/filterS/:subject",getFilterSubject)
 allRouter.post("/filterP",postFilterPrice)
 allRouter.get("/getByid/:id",getById)
 allRouter.get('/ratefilter/:rating',filterRating);
 allRouter.get("/search/:key",searchCourse);
 allRouter.get('/RSfilter/:rating/:subject',filterRatingSubject);
// allRouter.get("/home/:id",viewAcourse)
 module.exports=allRouter 
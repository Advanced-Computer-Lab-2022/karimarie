const express=require('express');
const allRouter=express.Router();
const {getAllCourses,getSubjects,getFilterSubject,logout,postFilterPrice,postFilterAll,getById,filterRating,
    searchCourse,getExamSolution,filterRatingSubject,addInstructorReview,sendMailAll,changepasswordAll,
    getByIdCourseDiscount,login,reportProblem,seeMyReports}=require("../controller/all-controller")

 allRouter.get("/home",getAllCourses);
 allRouter.get("/subjects",getSubjects);
 allRouter.get("/filterS/:subject",getFilterSubject)
 allRouter.post("/filterP",postFilterPrice)
 allRouter.get("/getByid/:id",getById)
 allRouter.get('/ratefilter/:rating',filterRating);
 allRouter.get("/search/:key",searchCourse);
 allRouter.get('/RSfilter/:rating/:subject',filterRatingSubject);
 allRouter.post('/addInstructorReview/:id',addInstructorReview);
 allRouter.get("/sendMailAll",sendMailAll);
 allRouter.post("/changepasswordAll",changepasswordAll);
 allRouter.get("/getByidCoursedic/:id",getByIdCourseDiscount);
 allRouter.get('/getExamSol/:CourseId',getExamSolution);
 allRouter.post('/login', login)
 allRouter.post('/postFilterAll', postFilterAll)
 allRouter.get('/logout', logout)
 allRouter.post('/reportProblem', reportProblem)
 allRouter.get('/seeMyReports/:id', seeMyReports)

// allRouter.get("/home/:id",viewAcourse)
 module.exports=allRouter 
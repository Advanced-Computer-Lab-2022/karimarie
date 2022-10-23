const express=require('express');
const instRouter=express.Router();
const courseTable=require("../models/Course");

const searchCourse=require("../controller/inst-controller");

instRouter.post('/search',searchCourse)



// instRouter.post("/:title", function (req, res) {
//     const course =  courseTable.findOne({'title': req.body.title}, function (err, courseTable) {
//   })});

// // instRouter.get('/:title',)

module.exports=instRouter;


  



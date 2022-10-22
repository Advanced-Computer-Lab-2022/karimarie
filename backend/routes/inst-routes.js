// const { application } = require('express');
// const express=require('express');
// const instRouter=express.Router();
// const courseTable=require("../models/Course");
// const {addCourse}=require("../controller/inst-controller");
// instRouter.post("/addCourse",async (req,res)=>{
//     const{title,price,rating,instructor,totalHours,subject,description}=req.body;
//     const course=new courseTable({
//         title,
//         price,
//         rating,
//         instructor,
//         totalHours,
//         subject,
//         description     
//     })
//     try{
//         await course.save();
//     }catch(err){
//         return console.log(err)
//     }
//     return res.status(200).json({course})
// });
// module.exports=instRouter;
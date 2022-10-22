const express = require("express");
const mongoose = require('mongoose');
const courseTable=require("../models/Course");
const app=express();
const addCourse=(req,res)=>{
    const{title,price,rating,instructor,totalHours,subject,description}=req.body;
    const course=new courseTable({
    title ,
    price,
    rating,
    instructor,
    totalHours,
    subject,
    description    
    })
    try{
        course.save();
    }catch(err){
        return console.log(err)
    }
    return res.status(200).json({course})
}
module.exports=addCourse;
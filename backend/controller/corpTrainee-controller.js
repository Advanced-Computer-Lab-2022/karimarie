const instTable=require("../models/Instructor");
const courseTable=require("../models/Course");
const subjectTable=require("../models/Subject")
const getAllCourses = async (req, res) => {
  console.log("as")
    let courses;
    try{
     courses = await courseTable.find({},{ _id: 0, title: 1, totalHours: 1,rating:1,subject:1 });
     return res.status(200).json({courses})
    }
    catch(error){res.status(404).json({error:error.message}) }
  }
  module.exports={getAllCourses}
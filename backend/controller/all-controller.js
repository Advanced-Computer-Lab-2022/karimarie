const instTable=require("../models/Instructor");
const courseTable=require("../models/Course");
const subjectTable=require("../models/Subject")
const getAllCourses = async (req, res) => {
  console.log("as")
    let courses;
    try{
     courses = await courseTable.find({},{ _id: 0, title: 1, totalHours: 1,rating:1,price:1,subject:1 });
     return res.status(200).json({courses})
    }
    catch(error){res.status(404).json({error:error.message}) }
  }
  const getSubjects=async(req,res)=>{
    let subjects;
    try{
        subjects=await subjectTable.find();
        subjects.save
        return res.status(200).json({subjects})
    }
    catch(error){res.status(404).json({error:error.message}) }
  }
// const viewAcourse=async(req,res,next)=>{
//     const id=req.params.id;
//     let course;
//     try{
//        course=courseTable.findById(id)
//        return res.status(200).json({course})
//     }
//     catch(error){return res.status(400).json({error:error.message})}
//  } // view details of a single course by pressing on it

const getFilterSubject=async (req,res) => {
  console.log("aaaaaaaaa")
  console.log(req.params.subject)
  let filter={}
  let courseList;
  if(req.params.subject){
      filter= {subject: req.params.subject}
  }
  try{
    courseList= await courseTable.find(filter).populate('subject');
    courseList.save
    return res.status(200).json({courseList})
  }
  catch (err){
    res.status(404).json({err: err.message})
  }
  

}
  module.exports={getAllCourses,getSubjects,getFilterSubject}
const courseTable=require("../models/Course");
const instTable=require("../models/Instructor");
const mongoose=require('mongoose');
const toId=mongoose.Types.ObjectId
const getAllInst=async(req,res,next)=>{
        let inst;
        try{
          inst=await instTable.find();
        }
        catch(err){
           console.log(err);
        }
        if(!inst){
           return res.status(404).json({message:"no"})
        }
        return res.status(200).json({inst:inst})

}
const instLogin=async(req,res,next)=>{
   const{userName,password}=req.body;
   let existingInst;
   try{
      existingInst=await instTable.findOne({userName});
    }
    catch(err){
       console.log(err);
    }
    if(!inst){
       return res.status(404).json({message:"no"})
    }
    
}

const searchCourse=async(req,res,next)=>{
   let course;
   const{input}=req.body
   try{
      console.log(input)
      course = courseTable.find({'title':input})
      
      return res.status(200).json({inst})
      
   }
   catch(error){  
      console.log("Error")
      return res.status(404).json({message:error.message})}
}
const createCourse=async (req,res,next)=>{     
   const{title,price,instructor, totalHours, subject, description,subtitles}=req.body
   let course;
   try{
       course =new courseTable({
           title:title,
           price:price,
           totalHours:totalHours, 
           subject:subject, 
           description:description, 
           instructor:instructor,
           subtitles:subtitles
       })
       await course.save();
      //  const x=course.id;
      //  console.log(x);
      //  filter= {userName:instructor}
      //  instTable.updateOne(
      //    {userName:instructor},
      //    { password: "dddddddddddd" } 
      
      
      // const inst=instTable.findOne(filter).populate('userName');
      // inst.courses.push
       return res.status(201).json({course:course})

   }
   catch(err){
       console.log(err)
       return res.status(404).json({message:err.message})
   }
 
     
   
 
}
module.exports={getAllInst,searchCourse,createCourse};
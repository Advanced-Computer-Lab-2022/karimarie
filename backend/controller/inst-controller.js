const courseTable=require("../models/Course");

const createCourse=async (req,res,next)=>{
        
    const{title,price,rating, instructor, totalHours, subject, description}=req.body
    let course;
    try{
        course =new courseTable({
            title,
            price,
            rating, 
            instructor, 
            totalHours, 
            subject, 
            description
        })
        await course.save();
        return res.status(201).json({course})

    }
    catch(error){
       // console.log(err)
       return res.status(404).json({error:error.message})
    }
}

const getAllCourses = async (req, res) => {
    try{
    const courses = await courseTable.find({}).sort({createdAt: -1})
  
    return res.status(200).json({courses})
    }
    catch{
        
    }
  }

module.exports={createCourse,getAllCourses};


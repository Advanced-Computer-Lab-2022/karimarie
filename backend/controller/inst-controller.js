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
    
        }
        catch(err){
            console.log(err)
        }
        if(!course){
            return res.status(404).json({message:"no"})
        }
        return res.status(201).json({course:course})
}

const getAllCourses = async (req, res) => {
    const courses = await courseTable.find({}).sort({createdAt: -1})
  
    res.status(200).json(courses)
  }
// const getAllCourses=async(req,res,next)=>{
    
//     const{title,price,rating, instructor, totalHours, subject, description}=req.body
//     let course;
//     try{
//       course=await courseTable.findAll();
//     }
//     catch(err){
//        console.log(err);
//     }
//     // if(!course){
//     //    return res.status(404).json({message:"no"})
//     // }
//     return res.status(200).json({course:course})
// }

module.exports={createCourse,
getAllCourses};
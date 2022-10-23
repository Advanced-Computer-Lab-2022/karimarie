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

module.exports={createCourse};
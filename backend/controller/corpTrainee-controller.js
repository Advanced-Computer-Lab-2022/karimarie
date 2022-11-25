const instTable=require("../models/Instructor");
const courseTable=require("../models/Course");
const subjectTable=require("../models/Subject")
const courseReviews=require("../models/coursesReviews")
const getAllCourses = async (req, res) => {
  console.log("as")
    let courses;
    try{
     courses = await courseTable.find({},{ _id: 0, title: 1, totalHours: 1,rating:1,subject:1 });
     return res.status(200).json({courses})
    }
    catch(error){res.status(404).json({error:error.message}) }
  }

  // const addCourseReview = async (req, res) => {
  //   const course = await courseTable.findById(req.params.id);
  //   let myreviews={};
  //    if(req.params.id){
  //        myreviews= {course: req.params.id} 
  //    }
  // try{
  //   console.log("tryyyyy")
  //   let data = {
  //       rating: req.body.rating,
  //       description: req.body.description,
  //       course: req.params.course
  //   }
   
  //   const review = await courseReviews.create(data)
  
  //   const courseReview= await courseReviews.find(req.params.id);
  //   //console.log(instructorReview);
    
  //   const length= courseReview.length
  //   if(length!=0){
  //   course.rating =courseReview.reduce((acc, item) => item.rating + acc, 0) /length
  //   await course.save()
  //   console.log(course.rating);
  //   }
  //   res.status(200).send(review)
  
  // }
  // catch(err){
  //   console.log(err)
  //   return res.status(404).json({message:err.message})
  // }
  
  // }

  const addCourseReview = async (req, res) => {
   
    const course = await courseTable.findById(req.params.course);
    let myreviews={};
     if(req.params.id){
         myreviews= {course: req.params.course} 
     }
     console.log(req.body.rating) 
     console.log(req.body.description) 
     console.log(req.params.course) 
     console.log(course) 



  try{
    let data = {
        rating: req.body.rating,
        description: req.body.description,
        course: req.params.id
    }
    const review = await courseReviews.create(data)
  
    const courseReview= await courseReviews.find(myreviews);
    console.log(courseReviews);
    console.log('hi')
    const length= courseReviews.length
    if(length!=0){
      
    course.rating =courseReview.reduce((acc, item) => item.rating + acc, 0) /length
    await course.save()
    console.log(course.rating);
    }
    res.status(200).send(review)
  
  }
  catch(err){
    console.log(err)
    return res.status(404).json({message:err.message})
  }
    
  
  }
  
  module.exports={getAllCourses,addCourseReview}
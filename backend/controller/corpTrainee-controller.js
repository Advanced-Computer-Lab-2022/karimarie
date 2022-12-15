const instTable=require("../models/Instructor");
const courseTable=require("../models/Course");
const subjectTable=require("../models/Subject")
const courseReviews=require("../models/coursesReviews")
const requestsTable=require("../models/Requests")
const traineeTable=require("../models/Trainee")
const refundReqTable=require("../models/RefundReq")
const getAllCourses = async (req, res) => {
  console.log("as")
    let courses;
    try{
     courses = await courseTable.find({},{ _id: 0, title: 1, totalHours: 1,rating:1,subject:1 });
     return res.status(200).json({courses})
    }
    catch(error){res.status(404).json({error:error.message}) }
  }


  const addCourseReview = async (req, res) => {
   
    const course = await courseTable.findById(req.params.course);
    let myreviews={};
     if(req.params.course){
         myreviews= {course: req.params.course} 
     }
  try{
    let data = {
        rating: req.body.rating,
        description: req.body.description,
        course: req.params.course
    }
    
    const review = await courseReviews.create(data);
    review.save();
    const courseReview= await courseReviews.find(myreviews);
    const length= courseReview.length
    if(length!=0){
    course.rating =(courseReview.reduce((acc, item) => item.rating + acc, 0)) /length
    await course.save()
    }
    res.status(200).send(review)
  
  }
  catch(err){
    console.log(err)
    return res.status(404).json({message:err.message})
  }
    
  
  }
  const reqAccess=async(req,res)=>{
    const {corpId,courses}=req.body;
    console.log(courses[0].courseId);
    try{
      let c=await courseTable.findById(courses[0].courseId);
      let i=await instTable.findById(c.instructor);
      let ct=await traineeTable.findById(corpId);
      let instructorName=(i.firstName).concat(" ", i.lastName);
      let corpTraineeName=(ct.firstName).concat(" ", ct.lastName);
      let item={courseId:courses[0].courseId,courseName:c.title,courseInstructor:instructorName,status:false};
  if(requestsTable.findOne({"corpId":corpId}).count() > 0){
        console.log("la2eito")
        let req= await requestsTable.updateOne(
          {
            corpId: corpId,
          
          },
          { $push: { "courses" : item} }
       )
       return res.status(200).json({req});
    }
     else{
        console.log("not found")
        let req={
          corpId:corpId,
             corpName:corpTraineeName,
              courses:item
           }
           const x = await requestsTable.create(req);
          return res.status(201).json({x})
      }
    }
    catch(err){ return res.status(404).json({message:err.message})}
  }
const reqA=async(req,res)=>{
  const {corporateName,corpId,courses}=req.body;
  try{
    let c=await courseTable.findById(courses);
    let i=await instTable.findById(c.instructor);
    let ct=await traineeTable.findById(corpId);
      let instructorName=(i.firstName).concat(" ", i.lastName);
    let corpTraineeName=(ct.firstName).concat(" ", ct.lastName);
        // let item={courseId:courses[0].courseId,courseName:c.title,courseInstructor:instructorName,status:false};
    let sherka=ct.corporateName;
    console.log(sherka)
    let x= await requestsTable.countDocuments( { "table": { $elemMatch: { corporateName:  sherka } } }  )
    console.log(x);
    // if(x>0){
    //   let foundelem=requestsTable.findOneAndUpdate( { "table": { $elemMatch: { corporateName: { sherka} } } },{
    //     $push: { "table.courses" : item} 

    //   } )
    // }
    if(x==0){
      let m=new requestsTable({table:[{sherka,corpTraineeName, }]})
    }

    // }
    // else{
    //   if(requestsTable.countDocuments({})>0){
    //     let m=await requestsTable.uo
    //   }
    // }
  }
  catch(error){
    return res.status(404).json({message:error.message})
  }
}
const reqAA=async(req,res)=>{
  const {corpId,courses}=req.body;
  let c=await courseTable.findById(courses);
  let i=await instTable.findById(c.instructor);
  let ct=await traineeTable.findById(corpId);
  let instructorName=(i.firstName).concat(" ", i.lastName);
  let corpTraineeName=ct.userName;
  let sherka=ct.corporateName;
  let coursename=c.title;
  console.log(courses);
  try{
    let x =new requestsTable({
      corporateName:sherka,
      corpId:
        corpId
      ,
      corpName:
        corpTraineeName
      ,
      courses:
      
         courses
      ,
      courseName:
          coursename

      ,
      courseInstructor:instructorName,
      status:false

    })
          await x.save();

    return res.json({success: true, message: 'Successfuly requested'});

  }
  catch(error){
    return res.json({success: false, message: 'Unable to request Access'});

  }

}
const refundRequest=async(req,res)=>{
  const{traineeId,courseId}=req.body
  console.log(traineeId);

  try{
    let courseName= await courseTable.findById(courseId).select("title").exec();
    let coursePrice= await courseTable.findById(courseId);
    let traineeName=await traineeTable.findById(traineeId);
    let data={
      traineeId: traineeId,
      courseId: courseId,
      courseName:courseName.title,
      traineeName:traineeName.userName,
      amount: coursePrice.price
    }
    const req = await refundReqTable.create(data);
    req.save();

    return res.status(404).json(req)
  }
  catch(error){      return res.status(404).json({message:error.message})

}
}
  module.exports={getAllCourses,addCourseReview,reqAccess,refundRequest,reqA,reqAA}
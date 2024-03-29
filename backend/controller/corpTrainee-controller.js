const instTable=require("../models/Instructor");
const courseTable=require("../models/Course");
const subjectTable=require("../models/Subject")
const courseReviews=require("../models/coursesReviews")
const requestsTable=require("../models/Requests")
const traineeTable=require("../models/Trainee")
const jwt =require('jsonwebtoken')
const bcrypt = require('bcrypt')
const refundReqTable=require("../models/RefundReq")
const notificationsTable=require("../models/Notification")
const progressTable = require("../models/Progress");


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
        course: req.params.course,
        userName:req.body.userName
    }
    const review = await courseReviews.create(data);
    review.save();
    const courseReview= await courseReviews.find(myreviews);
    const length= courseReview.length
    if(length!=0){
    course.rating =Math.ceil(((courseReview.reduce((acc, item) => item.rating + acc, 0)) /length)*10)/10
    await course.save()
    }
    res.status(200).send(review)
  
  }
  catch(err){
    console.log(err)
    return res.status(404).json({message:err.message})
  }
    
  
  }
  const reqAA=async(req,res)=>{
    const {corpId,courses}=req.body;
    var decodeID="";
  if (corpId) {
    jwt.verify(corpId, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name; 
      }
    });
  }
  console.log(decodeID)
    let c=await courseTable.findById(courses);
    let price=c.price;
    let currency=c.currency;
    let i=await instTable.findById(c.instructor);
    let ct=await traineeTable.findById(decodeID);
    let instructorName=(i.firstName).concat(" ", i.lastName);
    let corpTraineeName=ct.userName;
    let sherka=ct.corporateName;
    let coursename=c.title;
    console.log(courses);
    try{
      let isfound=await requestsTable.findOne({corpId:decodeID,courses:courses})
      console.log(isfound)
      if(isfound){
        return res.json({success: false, message: 'no'});
      }
      else{
      let x =new requestsTable({
        corporateName:sherka,
        corpId:
          decodeID
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
        status:false,
        price:price,
        currency:currency
  
      })
            await x.save();
      console.log("hi")
      return res.json({success: true, message: 'Successfuly requested'});
  
    }}
    catch(error){
      return res.json({success: false, message: 'Unable to request Access'});
  
    }
  
  }
const editPassword = async (req, res) => {
  
  var decodeID="";
  var finalres=""
  if (req.params.token) {
    jwt.verify(req.params.token, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name;
      }
    });
  }
  const { password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
        if(decodeID){
           finalres =  await traineeTable.findByIdAndUpdate(
            String(decodeID),
            {
              password: hashedPassword,
              firstTime :false
            },
            { new: true }
          );
        }
   if(finalres){
    await res.status(200).json(finalres);

   }
    else {
     res.status(400).json({ error: "couldn't" });
   }
 };
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
      amount: coursePrice.price,
      currency :coursePrice.currency
    }
    const req = await refundReqTable.create(data);
    req.save();

    return res.status(404).json(req)
  }
  catch(error){      return res.status(404).json({message:error.message})

}
}
const getTrainee = async (req, res, next) => {

  const id = req.params.id;
 
  let trainee;
  var decodeID="";
  var finalres=""
  if (req.params.id) {
    jwt.verify(req.params.id, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name;
      }
    });
  }
  try {


    trainee = await traineeTable.findById(decodeID);
    trainee.save()
    
    return res.status(200).json({ trainee });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
const getById = async (req, res, next) => {
  //console.log("s")
  const id = req.params.token;
  var decodeID="";
  if(req.params.token){
   jwt.verify(req.params.token, 'supersecret', (err, decodedToken) => {
     if (err) {
       res.status(401).json({message:"You are not logged in."})
     } else {
       decodeID=decodedToken.name;
     }
   });
  }
  try {
    inst = await traineeTable.findById(decodeID);
    inst.save()
    return res.status(200).json({ inst });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const payForCourseWallet = async (req, res, next) => {
  const courseid = req.params.id;
  console.log(courseid)
  const traineeid = req.params.id2;
  console.log(traineeid)
  var decodeID="";
  if (traineeid) {
    jwt.verify(traineeid, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name; 
      }
    });
  }
  console.log(decodeID)
  const course = await courseTable.findById(courseid);
  const trainee = await traineeTable.findById(decodeID);
  const instructorId = course.instructor;

  try {
    const price = course.price;
    const money = trainee.money;
    const toCurrency = "EGP";
    const base_URL = "https://api.exchangerate.host/latest";
    const res1 = await axios
      .get(`${base_URL}?base=${course.currency}&symbols=${toCurrency}`)
      .then((res1) => res1.data);
    const exchangeRate = res1.rates[toCurrency];
    console.log("exchangeRate " + exchangeRate);
    const newPrice = price * exchangeRate;
    console.log(newPrice);
    if (money >= newPrice) {
      const finalamount = money - newPrice;
      console.log(finalamount)
      const finalres = await traineeTable.findByIdAndUpdate(
        decodeID,
        {
          money: finalamount,
          $addToSet: { courses:{courseID: courseid }},
        },
        { new: true }
      );
      console.log(finalres)
      const myInstructor = await instTable.findById(instructorId);

      const mybalance = myInstructor.balance;
      // console.log(mybalance);
      // console.log(price);
      const remainingPrice = newPrice - newPrice * 0.1;
      // console.log(remainingPrice);
      const finalbalance = mybalance + remainingPrice;
      // console.log("instructor's balance" + finalbalance);

      const instructor = await instTable.findOneAndUpdate(
        instructorId,
        {
          balance: finalbalance,
        },
        { new: true }
      );
      return res.status(201).json({ message:"yes" });
    } else {
      return res.status(201).json({ message: "not enough money" });
    }
  } catch (err) {
    return res.status(404).json({ message: "no" });
  }
};
const axios = require("axios").create({
  baseUrl: "https://api.exchangerate.host/latest",
});
const payForCourse = async (req, res, next) => {
  const stripe = require("stripe")(
    "sk_test_51MEI8aGdZfaXR0mrOiJlsqZbEV5ZJWJwWVyQ52kt1dlJPagOAkPNTUKlkozFJeheXehpkZgqL5nZpHtdr0twO32b00tw7DvIW3"
  );
  const { email, token ,studid} = req.body;
  console.log(req.body);
  // console.log(email);
  // console.log("ana henaaaaaa");
  var decodeID="";
  if (studid) {
    jwt.verify(studid, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name; 
      }
    });
  }
  console.log(decodeID)

  const courseid = req.params.id;
  const currencyprice = req.params.currencyPrice;
  console.log("currency " + currencyprice);
  const course = await courseTable.findById(courseid);
  course.numStudents=course.numStudents+1;
  course.save()
  const price = course.price;

  // console.log(email);
  const trainee = await traineeTable.findOneAndUpdate(
    { _id: decodeID },
    { $addToSet: { courses:{courseID: courseid }} }
  );

  course.subtitles.map((course)=>{
    course.Video.map(async (video)=>{
         await progressTable.create({ traineeID: trainee._id, courseID: courseid, videoID: video});
    })
})
  
  if(trainee.email!==email){
    return res.status(200).json({message:"no"})
  }else {

  const instructorId = course.instructor;
  // console.log("instructor's id " + instructorId);
  const myInstructor = await instTable.findById(instructorId);

  const mybalance = myInstructor.balance;
  console.log(mybalance);
  console.log(price);
  const remainingPrice = price - price * 0.1;
  const toCurrency = "EGP";
  const base_URL = "https://api.exchangerate.host/latest";
  const res1 = await axios
    .get(`${base_URL}?base=${currencyprice}&symbols=${toCurrency}`)
    .then((res1) => res1.data);
  const exchangeRate = res1.rates[toCurrency];
  console.log(remainingPrice);
  console.log("exchangeRate " + exchangeRate);
  const newPrice = remainingPrice * exchangeRate;
  console.log(newPrice);

  const finalbalance = mybalance + newPrice;
  console.log("instructor's balance" + finalbalance);

  const instructor = await instTable.findOneAndUpdate(
    instructorId,
    {
      balance: finalbalance,
    },
    { new: true }
  );
  console.log("currency " + currencyprice);

  stripe.customers
    .create({
      email: email,
      source: token.id,
      name: token.card.name,
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: parseFloat(price) * 100,
        description: `Payment for ${currencyprice} ${price}`,
        currency: currencyprice,
        customer: customer.id,
      });
    })
    //el currency el mafrood tetbe3et men el params
    .then((charge) => res.status(200).send(charge))
    .catch((err) => console.log(err));}
};

const addP=async(req,res)=>{
  console.log("hi")
  const {courseID,traineeID,videoID,progress}=req.body;
  console.log(progress)
 
  var decodeID="";
  if (traineeID) {
    jwt.verify(traineeID, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name; 
      }
    });
  }

  try{
    if(decodeID){
    let z=await progressTable.findOneAndUpdate({courseID:courseID,traineeID:decodeID,videoID:videoID},{$set:{progress:progress}},{new:true});
  return res.status(200).json({message:"yes"})}

  }
  catch(error){
    return res.status(404).json({message:error.message});
  }


}
const getProg=async(req,res)=>{
  console.log("hi")
  const {courseID,traineeID}=req.body;
  console.log(courseID)
  console.log(traineeID)
  
  try{
   
    let z=await progressTable.find({courseID:courseID,traineeID:traineeID});
    console.log("ggggggggggggggggggg")
    
      console.log("jijijji")
      console.log(z);
      var reduced = z.reduce(function (r, a) {
        return r + a.progress;
        //    ^^^ use the last result without property
    }, 0);
      
    
    console.log(reduced)
    console.log(z)
  return res.status(200).json(reduced)

  }
  catch(error){
    return res.status(404).json({message:error.message});
  }


}
const viewWallet=async(req,res)=>{
  const id=req.body.id;
  console.log("ddd"+id);
  try{
    jwt.verify(req.body.id, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name;
      }
    });
    let trainee=await traineeTable.findById(decodeID);
    console.log(trainee)
    const money=trainee.money;
    if(money){
      return   res.status(200).json(money)
    }
    else{
      return   res.status(200).json("no")
    }
  }
  catch(error){      return res.status(404).json({message:error.message})

}
}
  module.exports={getAllCourses,payForCourse,addCourseReview,refundRequest,viewWallet,reqAA,getById,payForCourseWallet,editPassword,getTrainee,addP,getProg}
const instTable=require("../models/Instructor");
const courseTable=require("../models/Course");
const subjectTable=require("../models/Subject")
const instructorReviews=require("../models/instructorReviews")
const traineeTable=require("../models/Trainee")
const examTable=require("../models/Exam")
const adminTable=require("../models/Admin");
const axios=require("axios").create({baseUrl:"https://api.exchangerate.host/latest"});
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const courseReviews=require("../models/coursesReviews")
const notificationsTable=require("../models/Notification")
const problemTable=require("../models/Problem")

const getAllCourses = async (req, res) => {
  
 
    let priceList;
    try{
     priceList = await courseTable.find({});
     return res.status(200).json({priceList})
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
const postFilterAll=async(req,res)=>{
    let currencyFilter=req.body.currency;
   let priceFilter=req.body.price;
   let subjectFilter=req.body.subject;
   let ratingFilter=req.body.rating;
   let priceList=[]
   try{
    if(priceFilter){
      const courses= await courseTable.find();
      await Promise.all(courses.map( async (course)=>{
        const fromCurrency=course.currency
        const toCurrency=currencyFilter
        const base_URL='https://api.exchangerate.host/latest'
        const res1= await axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then( res1=>res1.data);
        const exchangeRate=res1.rates[toCurrency];
        course.price=course.price*exchangeRate;
        course.currency=currencyFilter;
      }))
      let priceList =  courses.filter(function (el){
        return el.price <=priceFilter});
      if(subjectFilter){
        priceList=priceList.filter(function (el){
          return el.subject ==subjectFilter});
      }
      if(ratingFilter){
        priceList=priceList.filter(function (el){
        return el.rating ==ratingFilter});
      }
      return res.status(200).json({ priceList });
    }else if(ratingFilter && subjectFilter){
      priceList= await courseTable.find({rating: ratingFilter,subject: subjectFilter});    
    return res.status(200).json({priceList})
  }else if(ratingFilter){
    priceList= await courseTable.find({rating: ratingFilter});    
    return res.status(200).json({priceList})
  }else if(subjectFilter){
    priceList= await courseTable.find({subject: subjectFilter});    
    return res.status(200).json({priceList})

  }
  }
  catch(err){  return res.status(404).json({error :err.message});}
}
const getFilterSubject=async (req,res) => {
  //console.log("aaaaaaaaa")
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


const postFilterPrice=async (req,res) => {
 
  
  let Pfilter={};
   let currencyFilter=req.body.currency.currencyFilter;
   let priceFilter=req.body.price.price;
   
   if(req.body.price){
       Pfilter= {price: req.body.price}
   }
   try{
    const courses= await courseTable.find();
    await Promise.all(courses.map( async (course)=>{
      const fromCurrency=course.currency
      const toCurrency=currencyFilter
      const base_URL='https://api.exchangerate.host/latest'
      const res1= await axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then( res1=>res1.data);
      const exchangeRate=res1.rates[toCurrency];
      course.price=course.price*exchangeRate;
      course.currency=currencyFilter;
    }))

      const priceList =  courses.filter(function (el){
      return el.price <=priceFilter });
      return res.status(200).json({ priceList });
    
     
   }
   catch(err){ res.status(404).json({err: err.message})}
}
const getById = async (req, res, next) => {
  //console.log("s")
  const id = req.params.id;
  let course;
  try {
    course = await courseTable.findById(id);
    return res.status(200).json({ course });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const filterRating=async (req,res) => {

  let Rfilter={}
  if(req.params.rating){
      Rfilter= {rating: req.params.rating} 
  }
  try{
    const RcourseList= await courseTable.find(Rfilter).populate('rating');
    return res.status(200).json({RcourseList})
  }
  catch(err){ res.status(404).json({error: err.message})}
};

const searchCourse = async (req, res) => {
  await courseTable
    .find()
    .populate("instructor", "userName")
    .exec(async (err, courses) => {
      if (err) return;
      let instructorCourses =
        courses.filter((course) =>
          course.instructor.userName.includes(req.params.key)
        ) || [];

        let keyCourses = await courseTable.find({
        $or: [
          { title: { $regex: req.params.key ,$options:'i' } },
          {
            subject: { $regex: req.params.key ,$options:'i'},
          },
        ],
      });
      let priceList=[...instructorCourses, ...keyCourses];
      res.send({priceList});
    });
};

const filterRatingSubject=async (req,res) => {
  
  try{
    const resultList= await courseTable.find({rating: req.params.rating,subject: req.params.subject});
    return res.status(200).json({resultList})
  }
  catch(err){  return res.status(404).json({error :err.message});}
};



const addInstructorReview = async (req, res) => {
  const instructor = await instTable.findById(req.params.id);
  let myreviews={};
   if(req.params.id){
       myreviews= {instructor: req.params.id} 

   }
  
try{
  let data = {
      instructor: req.params.id,
      rating: req.body.rating,
      description: req.body.description,
      userName:req.body.userName
  }
  const review = await instructorReviews.create(data)

  const instructorReview= await instructorReviews.find(myreviews);
  const length= instructorReview.length
  if(length!=0){
  instructor.rating =Math.ceil((instructorReview.reduce((acc, item) => item.rating + acc, 0) /length)*10)/10
  await instructor.save()
  }
  res.status(200).send(review)

}
catch(err){
  console.log(err)
  return res.status(404).json({message:err.message})
}
  

}

require('dotenv').config();
const noString="http://localhost:3000/forgetpassword"
const sgMail=require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendMailAll= async (req, res) =>{
  const email= req.body.email;
const trainee= await traineeTable.findOne({email:email});
const inst=await instTable.findOne({email:email});
if(inst!==null){
  const instid=inst.id;
  await instTable.find({
    email:email
}).then(traineeTable => {
    if (traineeTable.length > 0) {
      const msg= {
        to: email, // Change to your recipient
        from: 'karimankamal15@gmail.com', // Change to your verified sender
        templateId: 'd-848acb26180e466895a85ac0a7f6b703',
        dynamicTemplateData: {
          subject: 'Forget Password',
          name: inst.firstName,
          link: `http:localhost:3000/forgetpasswordform/${instid}`,
        }, //`
 
      }
      sgMail.send(msg)
        .then((response) => {
          console.log(response[0].headers)
        })
        .catch((error) => {
          console.error(error)
        })
        return res.status(200).json({msg : instid});
    }
    else{
      return res.json({msg:"no"});
    }
});
}
else if(trainee!==null){
  const traineeid=trainee.id;
  await traineeTable.find({
    email:email
}).then(traineeTable => {
    if (traineeTable.length > 0) {
      const msg= {
        to: email, // Change to your recipient
        from: 'karimankamal15@gmail.com', // Change to your verified sender
        templateId: 'd-848acb26180e466895a85ac0a7f6b703',
        dynamicTemplateData: {
          subject: 'Forget Password',
          name: trainee.firstName,
          link: `http:localhost:3000/forgetpasswordform/${traineeid}`,
        }, //`
 
      }
      sgMail.send(msg)
        .then((response) => {
          console.log(response[0].headers)
        })
        .catch((error) => {
          console.error(error)
        })
        return res.status(200).json({msg : traineeid});
    }
    else{
      
      return res.json({msg :"no"});
    }
});
}
else {
  return res.json({msg :"no"});
}
}
const changepasswordAll = async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const idperson = await instTable.findById(id);
  if (idperson) {
    const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await instTable.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      { new: true }
    );
    return res.status(200).json(id);
  } else {
    //  console.log("ana fel else");
    const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
     await traineeTable.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      { new: true }
    );
    return res.status(200).json(id);
    // console.log(traineeresult);
   // await res.status(200).json(traineeresult);
  }
};
  
const getByIdCourseDiscount = async (req, res, next) => {
  //console.log("s")
 
  const id = req.params.id;
  let course;
  try {
    course = await courseTable.findById(id)
    course.save
    const expirationDate=new Date(course.expirationTime).getTime()
    const currentdate=new Date().getTime()
    if(expirationDate<currentdate){
      const { originalPrice } = await courseTable
          .findOne({ _id: id })
          .select("originalPrice")
          .exec();
      await courseTable.findByIdAndUpdate(
        id,
        {
          expirationTime: "",
           price: originalPrice
        },
        { new: true }
      );
    }
    return res.status(200).json({ course });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
const getExamSolution= async (req, res) => {
  try {
    //const courseId=req.params.courseId;
    const exam = await examTable.find({CourseId: req.params.CourseId});
    return res.status(200).json({ exam });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
};
const login = async (req, res) => {
  // TODO: Login the user
  const username = req.body.userName;
  const password = req.body.password;
    var user = "";
  const userX= await instTable.findOne({userName : req.body.userName})
  const userTrainee = await traineeTable.findOne({ userName: username});
  const userAdmin = await adminTable.findOne({ userName: username});

  if(userX){
  const ok= await bcrypt.compare(password, userX.password);
      if (ok) {
    const { firstTime } = await instTable
      .findOne({ userName: username })
      .select("firstTime")
      .exec();
    user = userX;
    const token = createToken(user._id);
    res
      .status(200)
      .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    if (firstTime) {
      return res.status(200).json({ token, msg: "InstructorfirstTime" });
    } else {
      return res.status(200).json({ token, msg: "Instructor" });
    }
      }
      else {
        return res.json({ success: false, msg: "no" });

      }
    }else if(userTrainee){
      console.log(userTrainee)
      console.log(password)
      
        const ok= await bcrypt.compare(password, userTrainee.password);
        if(ok){
          
                console.log("ok")
                user = userTrainee;
                const token = createToken(user._id);
                res
                  .status(200)
                  .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        if(user.type==="corporate trainee"){
          const { firstTime } = await traineeTable
          .findOne({ userName: username })
          .select("firstTime")
          .exec();
          if(firstTime){
            return res.status(200).json({ token, msg: "CorpTraineefirstTime" });
          }
          else {
            return res.status(200).json({ token, msg: "CorpTrainee" });    
          }
        }
          else {
            return res.status(200).json({ token, msg: "Trainee" });
          }
       
      }else {
        return res.json({ success: false, msg: "no" });
      }

    }else if(userAdmin){
      const ok= await bcrypt.compare(password, userAdmin.password);
      if(ok){
        user = userAdmin;
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ token, msg: "Admin" });
      }
     
    }else {
      return res.json({ success: false, msg: "no" });
    }

  
  
};
const logout = async (req, res) => {
  return res.cookie("jwt","",{httpOnly:true,maxAge:1});
}

const getCourseReviews =  async (req, res) => {
  let reviews;
  try{
    if(req.params.id!=="undefined"){
   reviews= await courseReviews.find({course:req.params.id});}
  }
  catch(err){
     console.log(err);
  }
  return res.status(200).json({reviews:reviews})

}
const reportProblem= async (req, res) => {
  var decodeID="";
  if(req.body.ReportById){
   jwt.verify(req.body.ReportById, 'supersecret', (err, decodedToken) => {
     if (err) {
       res.status(401).json({message:"You are not logged in."})
     } else {
       decodeID=decodedToken.name;
     }
   });
  }
  const{ReportById,CourseId,Report,Type}=req.body
   let problem;
   let ReportByName;
   let ReportByType;
   try{
    console.log(decodeID);
    let ifInst=await instTable.findById(decodeID);
    let ifTrainee=await traineeTable.findById(decodeID);
    console.log(ifInst)
    if(ifInst==null){
     ReportByName=ifTrainee.userName;
     ReportByType=ifTrainee.type;
     console.log("hey")
    }
    else{
      ReportByName=ifInst.userName;
      ReportByType="Instructor"
      console.log("bey")
    }
    let c=await courseTable.findById(CourseId);
    console.log(c);
       problem =new problemTable({
        ReportById:decodeID,
        ReportByName:ReportByName,
        ReportByType:ReportByType,
        CourseId:CourseId,
        CourseName:c.title,
        Type:Type,
        Report:Report,
        Status:"Unseen"
       })
       console.log(problem)
       await problem.save();
      
      
  return res.status(201).json({problem:problem})
     }
 catch(err){
  
     return res.status(404).json({message:err.message})
 }
 }
const seeMyReports=async(req,res)=>{

  var decodeID="";
  if(req.params.id){
   jwt.verify(req.params.id, 'supersecret', (err, decodedToken) => {
     if (err) {
       res.status(401).json({message:"You are not logged in."})
     } else {
       decodeID=decodedToken.name;
     }
   });
  }


  const id=req.params.id;
  console.log(id)
  console.log("hey")
  console.log(decodeID)
  try{
    let reports=await problemTable.find({ReportById:decodeID});
    console.log(reports)
    return res.status(200).json({ reports });

  }
  catch(error){
    return res.status(404).json({ error:error.message });

  }
}
const followUp=async(req,res)=>{
  const {id,followUp}=req.body;
  console.log(id);
  console.log(followUp);
  try{
    let isfound=await problemTable.findById(id);
    console.log(isfound.Report);
    console.log(isfound.FollowUp);
    if(isfound.FollowUp){
      return res.json({success: false, message: 'no'});

    }
    else{
      console.log("d")
    

   let x=await problemTable.findByIdAndUpdate( id,
    {
      FollowUp: followUp,
    },
    { new: true });
    console.log(x);
    return res.json({success: true, message: 'Successfuly requested'});
  }
  }
  catch(err){ return res.status(404).json({message:err.message})}
}
const checkfoll=async(req,res)=>{
  const {id,followUp}=req.body;
  try{
    let isfound=await problemTable.findById(id);
  console.log(isfound.Report);
  console.log(isfound.FollowUp);
  if(isfound.FollowUp){
    return res.json({success: false, message: 'no'});

  }
  else{
    return res.json({success: false, message: 'yes'});
  }
}
  catch(err){ return res.status(404).json({message:err.message})}
  
  
}
const getMyNotification=async(req,res)=>{
  let resultList;
    const userId=req.params.userId;
    console.log(userId);
    console.log("hey")
    resultList= await notificationsTable.find({userId:userId})
    if(resultList){
      console.log(resultList)
      console.log("hey")
    res.status(200).json({resultList })
    
    }
  }
  const exchangecurr=async (req,res) => {
    let balance= req.body.balance;
    const curr=req.body.curr;
  try{
        const fromCurrency="EGP"
        const toCurrency=curr
        const base_URL='https://api.exchangerate.host/latest'
        const res1= await axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then( res1=>res1.data);
        const exchangeRate=res1.rates[toCurrency];
        balance=balance*exchangeRate;
  }
  catch(err){ res.status(404).json({err: err.message})}
  
  
        return res.status(200).json({ balance });
  
  }
  module.exports={getAllCourses,logout,getSubjects,exchangecurr,checkfoll,followUp,getMyNotification,postFilterAll,getCourseReviews,seeMyReports,reportProblem,getFilterSubject,postFilterPrice,getById,filterRating,searchCourse,filterRatingSubject,addInstructorReview,sendMailAll,changepasswordAll,getByIdCourseDiscount,getExamSolution,login}
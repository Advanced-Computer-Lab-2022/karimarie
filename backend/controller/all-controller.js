const instTable=require("../models/Instructor");
const courseTable=require("../models/Course");
const subjectTable=require("../models/Subject")
const instructorReviews=require("../models/instructorReviews")
const traineeTable=require("../models/Trainee")
const examTable=require("../models/Exam")
const axios=require("axios").create({baseUrl:"https://api.exchangerate.host/latest"});
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getAllCourses = async (req, res) => {
  console.log("as")
    let courses;
    try{
     courses = await courseTable.find({});
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
  //console.log("aaaaaaaaa")
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
  console.log(id)
  let course;
  try {
    course = await courseTable.findById(id);
    course.save
    return res.status(200).json({ course });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const filterRating=async (req,res) => {

  let Rfilter={}
  console.log(req.params.rating)
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
  //console.log("Input", req.params.key);
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
          { title: { $regex: req.params.key,$options:'i' } },
          {
            subject: { $regex: req.params.key ,$options:'i'},
          },
        ],
      });
      let searchResult=[...instructorCourses, ...keyCourses];
      res.send(searchResult);
    });
};

const filterRatingSubject=async (req,res) => {
  
  try{
    const resultList= await courseTable.find({rating: req.params.rating,subject: req.params.subject});
    console.log( req.params.rating+""+req.params.subject)
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
      rating: req.body.rating.rating,
      description: req.body.description.description
  }
  const review = await instructorReviews.create(data)

  const instructorReview= await instructorReviews.find(myreviews);
  const length= instructorReview.length
  if(length!=0){
  instructor.rating =
  instructorReview.reduce((acc, item) => item.rating + acc, 0) /length
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
const noString="http://localhost:3000/forgetpasswordAll"
const sgMail=require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function sendMailAll(){
const msg= {
  to: 'karimankamal15@gmail.com', // Change to your recipient
  from: 'karimankamal15@gmail.com', // Change to your verified sender
  subject: 'Password',
  text: 'Follow this link for changing the password: http://localhost:3000/forgetpasswordAll',
  
}

sgMail.send(msg)
  .then((response) => {
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
}

const changepasswordAll = async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const idperson = await traineeTable.findById(id);
  await res.status(200).json(idperson);
  
    await traineeTable.findByIdAndUpdate(
      id,
      {
        password: password,
      },
      { new: true }
    );
    await res.status(200).json(idperson);
  
};
  
const getByIdCourseDiscount = async (req, res, next) => {
  //console.log("s")
 
  const id = req.params.id;
  console.log(id)
  let course;
  try {
    course = await courseTable.findById(id)
    course.save
    const expirationDate=new Date(course.expirationTime).getTime()
    const currentdate=new Date().getTime()
    console.log(expirationDate)
    console.log(currentdate)
    if(expirationDate<currentdate){
      console.log("hi")
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
// const login = async (req, res) => {
//   // TODO: Login the user
//   const username=req.body.name;
//   const password=req.body.password;
//   const user= await userModel.findOne({name : req.body.name})
//   const x= bcrypt.compare(password, user.password)
//       // if (error){
//       //   // handle error
//       //   return res.status(400).json({ error: error.message })
//       // }
//       if (x) {
//         // Send JWT
//         const token = createToken(user.name);
//         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//         return res.status(200).json({ msg: "Login success" })

//       } else {
//         // response is OutgoingMessage object that server response http request
//         return res.json({success: false, message: 'passwords do not match'});
//       }
//     ;
// }
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
};
const login = async (req, res) => {
  // TODO: Login the user
  const username=req.body.userName;
  const password=req.body.password;
  const user= await instTable.findOne({userName :username})
  const x= bcrypt.compare(password, user.password)
      // if (error){
      //   // handle error
      //   return res.status(400).json({ error: error.message })
      // }
      if (x) {
        // Send JWT
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ msg: "Login success" })

      } else {
        // response is OutgoingMessage object that server response http request
        return res.json({success: false, message: 'passwords do not match'});
      }
    ;
}
  module.exports={getAllCourses,getSubjects,getFilterSubject,postFilterPrice,getById,filterRating,searchCourse,filterRatingSubject,addInstructorReview,sendMailAll,changepasswordAll,getByIdCourseDiscount,getExamSolution,login}
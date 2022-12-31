const courseTable=require("../models/Course");
const instTable=require("../models/Instructor");
const instructorReviews=require("../models/instructorReviews")
const mongoose=require('mongoose');
const toId=mongoose.Types.ObjectId
const examTable=require("../models/Exam");
const jwt =require('jsonwebtoken')
const bcrypt = require('bcrypt')
const notificationsTable=require("../models/Notification")
const axios=require("axios").create({baseUrl:"https://api.exchangerate.host/latest"});
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
const createCourse=async (req,res,next)=>{    
 const KEY="AIzaSyBlhTt07_yi5AwS4GlIqhaxfKjwiigmF4Y"
 
// console.log(res3.data.items)
// $duration = json_decode($dur, true);
// foreach ($duration['items'] as $vidTime) {
//     $vTime= $vidTime['contentDetails']['duration'];
// }

  var decodeID="";
  if (req.body.instructor) {
    jwt.verify(req.body.instructor, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name; 
      }
    });
  }
  const{title,price, totalHours, subject, description,subtitles,currency,rating,preview}=req.body
  let course;
  
  console.log(subtitles[0].Video)
  var acc=0;
  for(let i=0;i<subtitles.length;i++){
    for(let j=0;j<subtitles[i].Video.length;j++){
        console.log(subtitles[i].Video[j])
        const x=subtitles[i].Video[j].split("/")
        const id=x[4];

      const res3 = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=AIzaSyBlhTt07_yi5AwS4GlIqhaxfKjwiigmF4Y`).then((data)=>
  {
    const time_extractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
    const extracted = time_extractor.exec(data.data.items[0].contentDetails.duration);
    const hours = parseInt(extracted[1], 10) || 0;
    const minutes = parseInt(extracted[2], 10) || 0;
    const seconds = parseInt(extracted[3], 10) || 0;
    console.log( (hours * 60) + (minutes) + (seconds *(1/60)));
    acc+= (hours * 60) + (minutes) + (seconds *(1/60));


  });
    }
  }
  console.log(acc)
//  const res3 = await axios.get("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=QzakjlbO2Lc&key=AIzaSyBlhTt07_yi5AwS4GlIqhaxfKjwiigmF4Y").then((data)=>
//   {
//     const time_extractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
//     const extracted = time_extractor.exec(data.data.items[0].contentDetails.duration);
//     const hours = parseInt(extracted[1], 10) || 0;
//     const minutes = parseInt(extracted[2], 10) || 0;
//     const seconds = parseInt(extracted[3], 10) || 0;
//     console.log( (hours * 60) + (minutes) + (seconds *(1/60)));


//   });

  try{
      course =new courseTable({
          title:title,
          price:price,
          totalHours:totalHours, 
          subject:subject, 
          description:description, 
          instructor:decodeID,
          currency:currency,
          subtitles:subtitles,
          rating:rating,
          preview:preview,
          originalPrice:price,
          totalNumVideos:acc
      })
      await course.save();
      return res.status(201).json({course:course})

  }
  catch(err){
      console.log(err)
      return res.status(404).json({message:err.message})
  }

}
const getMyCourses2=async (req,res) => {
  let myCourses={};
  if(req.params.id){
      myCourses= {instructor: req.params.id} 
  }
  //console.log(myCourses)
  const resultList= await courseTable.find(myCourses).populate('instructor');
  if(!resultList){
      return res.status(404).json({error :'Invalid Input'});
  }
  res.send(resultList);

}
const getMyCourses=async (req,res) => {
  var decodeID="";
  var resultList="";
  console.log(req.params.token)
  if (req.params.token) {
    jwt.verify(req.params.token, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name; 
      }
    });
  }
  let myCourses={};
  if(decodeID){
      myCourses= {instructor: decodeID} 
      resultList=  await courseTable.find(myCourses).populate('instructor');
  }
   if(!resultList){
       return res.status(404).json({error :'Invalid Input'});
   }
   res.send(resultList);

}
const postFilterInstructor=async(req,res)=>{
  let currencyFilter=req.body.currency;
 let priceFilter=req.body.price;
 let subjectFilter=req.body.subject;
 let ratingFilter=req.body.rating;
 let priceList=[]
 if (req.params.token) {
  jwt.verify(req.params.token, 'supersecret', (err, decodedToken) => {
    if (err) {
      res.status(401).json({message:"You are not logged in."})
    } else {
      decodeID=decodedToken.name; 
    }
  });
}
 try{
  if(priceFilter){
    const courses= await courseTable.find({instructor:decodeID});
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

const filterMyCSubject =async (req,res) => {
   
   const resultList= await courseTable.find({instructor: req.params.instructor,subject: req.params.subject});
   
   if(!resultList){
       return res.status(404).json({error :'Invalid Input'});
   }
   res.send(resultList);
}
const filterMyCPrice =async (req,res) => {
   //console.log("hiuuuuuu")
   let currencyFilter=req.params.currencyFilter;
   let priceFilter=req.params.price;
   try{
   const courses= await courseTable.find({instructor: req.params.instructor});
    await Promise.all(courses.map( async (course)=>{
      const fromCurrency=course.currency
      const toCurrency=currencyFilter
      const base_URL='https://api.exchangerate.host/latest'
      const res1= await axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then( res1=>res1.data);
      const exchangeRate=res1.rates[toCurrency];
      course.price=course.price*exchangeRate;
      course.currency=currencyFilter;
    }))

    
    var priceList = courses.filter(function (el){
    return el.price <=priceFilter });
    return res.status(200).json({ priceList });
   }
   catch(err){ res.status(404).json({err: err.message})}
}

const searchInstCourse = async (req, res) =>{
  var decodeID="";
  if (req.params.token) {
    jwt.verify(req.params.token, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name; 
      }
    });
  }
  if(decodeID){
   const resultListTitle= await courseTable.find({instructor: decodeID, title: { $regex: req.params.search , $options:'i'}});
   const resultListSubject= await courseTable.find({instructor: decodeID, subject: { $regex: req.params.search , $options:'i'}});
   if(!resultListTitle || !resultListSubject){
       return res.status(404).json({error :'Invalid Input'});
   }
   let searchResult=[...resultListTitle, ...resultListSubject];
   res.send(searchResult);
  }
   

}

const getInstructorReviews =  async (req, res) => {
   let reviews;
   var decodeID="";
   if (req.params.token) {
    jwt.verify(req.params.token, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name; 
      }
    });
  }
   try{
    if(decodeID){
    reviews= await instructorReviews.find({instructor:decodeID});}
   }
   catch(err){
      console.log(err);
   }
   console.log(reviews)
   return res.status(200).json({reviews:reviews})

}
const getById2 = async (req, res, next) => {
  //console.log("s")
  const id = req.params.id;
  let course;
  try {
    inst = await instTable.findById(id);
    inst.save()
    return res.status(200).json({ inst });
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
     inst = await instTable.findById(decodeID);
     inst.save()
     return res.status(200).json({ inst });
   } catch (err) {
     return res.status(404).json({ message: err.message });
   }
 };

 const editbio = async (req, res) => {
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
  const { biography } = req.body;
        if(decodeID){
           finalres =  await instTable.findByIdAndUpdate(
            String(decodeID),
            {
              biography: biography,
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
           finalres =  await instTable.findByIdAndUpdate(
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
 const editemail = async (req, res) => {
  var decodeID="";
   const { email } = req.body;
   if (req.params.token) {
    jwt.verify(req.params.token, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name;
      }
    });
  }
   if (decodeID) {
     const finalres = await instTable.findByIdAndUpdate(
       String(decodeID),
       {
         email: email,
       },
       { new: true }
     );
     await res.status(200).json(finalres);
   } else {
     res.status(400).json({ error: "couldn't" });
   }
 };

 const changepasswordInstructor = async (req, res) => {
  const instid = req.body.id;
  const { password } = req.body;

  if (instid) {
    const finalres = await instTable.findByIdAndUpdate(
      instid,
      {
        password: password,
      },
      { new: true }
    );
    await res.status(200).json(finalres);
  } else {
    res.status(400).json({ error: "couldn't" });
  }
};


require('dotenv').config();
//const noString="http://localhost:3000/forgetpasswordInstructor"
const sgMail=require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function sendMailInstructor(){
const msg= {
  to: 'karimankamal15@gmail.com', // Change to your recipient
  from: 'karimankamal15@gmail.com', // Change to your verified sender
  subject: 'Password',
  text: 'Follow this link for changing the password: http://localhost:3000/forgetpasswordInstructor',
  
}

sgMail.send(msg)
  .then((response) => {
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
}

const createExam = async (req,res) =>{
  let exam;
  try{
     exam =examTable.create({
        CourseId:req.body.CourseId ,
        QuizNumber: req.body.QuizNumber,
        Content :req.body.Content,
        
        
  } )
     await exam.save();
     return res.status(201).json({exam})
 }
 catch(error){
     //console.log(error)
     return res.status(400).json({error: error.message})
 }        
}

const adddiscount = async (req, res) => {
  //const myid = req.params.myid;
  const courseid = req.params.id;
  const { discount, expirationTime, startTime } = req.body;
  console.log(discount,expirationTime,startTime);
  if (courseid && discount && expirationTime && startTime) {
    const endDate = new Date(expirationTime).toJSON().split("T")[0];
    const startDate = new Date(startTime).toJSON().split("T")[0];
    let currentDate1 = new Date();
    let currentDate= currentDate1.toJSON().split("T")[0]// new Date().getTime() returns value in number
    if (currentDate === startDate && currentDate <= endDate) {
      const finalres = await courseTable.findByIdAndUpdate(
        courseid,
        {
          discount: discount,
          expirationTime: expirationTime,
          startTime: startTime,
          discountapplied:true
        },
        { new: true }
      );
      const { price } = await courseTable
        .findOne({ _id: courseid })
        .select("originalPrice")
        .exec();

      const intermediatePrice = price;
      const totalPrice =
        intermediatePrice - intermediatePrice * (discount / 100);

    
      const updatedcourse = await courseTable.findByIdAndUpdate(
        courseid,
        { price: totalPrice },
        { new: true }
      );
      await res.status(200).json(updatedcourse);
    } else {
      if (currentDate < startDate) {
        const finalres = await courseTable.findByIdAndUpdate(
          courseid,
          {
            discount: discount,
            expirationTime: expirationTime,
            startTime: startTime,
            discountapplied:false
          },
          { new: true }
        );
      } else {
        if (currentDate > endDate) {
          const { originalPrice } = await courseTable
            .findOne({ _id: courseid })
            .select("originalPrice")
            .exec();
          //  console.log(originalPrice);
          const updatedcourse1 = await courseTable.findByIdAndUpdate(
            courseid,
            {
              price: originalPrice,
              discountapplied:false,
              startTime:"",
              expirationTime:""
            },
            { new: true }
          );
          await res.status(200).json(updatedcourse1);
        }
      }
    }
  } else res.status(400).json({ error: " Invalid Data" });
};

const getInstructorReviews2 =  async (req, res) => {
  let reviews;
  try{
   reviews= await instructorReviews.find({instructor:req.params.id});
  }
  catch(err){
     console.log(err);
  }
  return res.status(200).json({reviews:reviews})

}
module.exports={getAllInst,postFilterInstructor,getMyCourses2,getInstructorReviews2,editPassword,getById2,createCourse,getMyCourses,filterMyCSubject,filterMyCPrice,searchInstCourse,getInstructorReviews,getById,editbio,editemail,changepasswordInstructor,sendMailInstructor,createExam,adddiscount};
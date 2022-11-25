const courseTable=require("../models/Course");
const instTable=require("../models/Instructor");
const instructorReviews=require("../models/instructorReviews")
const mongoose=require('mongoose');
const toId=mongoose.Types.ObjectId
const examTable=require("../models/Exam");
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

// const searchCourse=async(req,res,next)=>{
//    let course;
//    const{input}=req.body
//    try{
//       console.log(input)
//       course = courseTable.find({'title':input})
      
//       return res.status(200).json({inst})
      
//    }
//    catch(error){  
//       console.log("Error")
//       return res.status(404).json({message:error.message})}
// }
const createCourse=async (req,res,next)=>{     
  const{title,price,instructor, totalHours, subject, description,subtitles,currency,rating,preview}=req.body
  let course;
  try{
      course =new courseTable({
          title:title,
          price:price,
          totalHours:totalHours, 
          subject:subject, 
          description:description, 
          instructor:instructor,
          currency:currency,
          subtitles:subtitles,
          rating:rating,
          preview:preview
      })
      await course.save();
      return res.status(201).json({course:course})

  }
  catch(err){
      console.log(err)
      return res.status(404).json({message:err.message})
  }

}

const getMyCourses=async (req,res) => {
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
   const resultListTitle= await courseTable.find({instructor: req.params.instructor, title: { $regex: req.params.search , $options:'i'}});
   const resultListSubject= await courseTable.find({instructor: req.params.instructor, subject: { $regex: req.params.search , $options:'i'}});
   if(!resultListTitle || !resultListSubject){
       return res.status(404).json({error :'Invalid Input'});
   }
   let searchResult=[...resultListTitle, ...resultListSubject];
   res.send(searchResult);
   

}

const getInstructorReviews =  async (req, res) => {
   let reviews;
   try{
    reviews= await instructorReviews.find({instructor:req.params.id});
   }
   catch(err){
      console.log(err);
   }
   return res.status(200).json({reviews:reviews})

}

const getById = async (req, res, next) => {
   //console.log("s")
   const id = req.params.id;
   console.log(id)
   let course;
   try {
     inst = await instTable.findById(id);
     inst.save()
     return res.status(200).json({ inst });
   } catch (err) {
     return res.status(404).json({ message: err.message });
   }
 };

 const editbio = async (req, res) => {
   const instid = req.params.id;
   const { biography } = req.body;
 
   if (instid) {
     const finalres = await instTable.findByIdAndUpdate(
       instid,
       {
         biography: biography,
       },
       { new: true }
     );
     await res.status(200).json(finalres);
   } else {
     res.status(400).json({ error: "couldn't" });
   }
 };

 const editemail = async (req, res) => {
   const instid = req.params.id;
   const { email } = req.body;
 
   if (instid) {
     const finalres = await instTable.findByIdAndUpdate(
       instid,
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
  console.log("dakhaltt")
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
  console.log(req.body.Content.options)
  let exam;
  try{
     exam =new examTable({
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
  const { discount, expirationTime } = req.body;

  //console.log("ana henaaaa");
  //console.log(courseid);
  //console.log(discount);
  // console.log("expirationnnn" + expirationTime);

  if (courseid) {
    const finalres = await courseTable.findByIdAndUpdate(
      courseid,
      {
        discount: discount,
        expirationTime: expirationTime,
      },
      { new: true }
    );
    // await res.status(200).json(finalres);
    console.log(finalres);
    if (discount && expirationTime) {
      //  console.log("ana fel ifff");
      const { price } = await courseTable
        .findOne({ _id: courseid })
        .select("price")
        .exec();

      const intermediatePrice = price;
      const totalPrice =
        intermediatePrice - intermediatePrice * (discount / 100);
      const endDate = new Date(expirationTime);
      let currentDate = new Date().getTime(); // new Date().getTime() returns value in number

      //console.log(endDate, currentDate);
     if (currentDate <= endDate) {
        const updatedcourse = await courseTable.findByIdAndUpdate(
          courseid,
          { price: totalPrice },
          { new: true }
        );
        await res.status(200).json(updatedcourse);
      } else {
        //console.log("ana fel elseeee");
        const { originalPrice } = await courseTable
          .findOne({ _id: courseid })
          .select("originalPrice")
          .exec();
        //  console.log(originalPrice);
        const updatedcourse1 = await courseTable.findByIdAndUpdate(
          courseid,
          {
            price: originalPrice,
          },
          { new: true }
        );
        await res.status(200).json(updatedcourse1);
      }
    }
  } else res.status(400).json({ error: "couldn't" });
};

module.exports={getAllInst,createCourse,getMyCourses,filterMyCSubject,filterMyCPrice,searchInstCourse,getInstructorReviews,getById,editbio,editemail,changepasswordInstructor,sendMailInstructor,createExam,adddiscount};
const courseTable=require("../models/Course");
const instTable=require("../models/Instructor");
const mongoose=require('mongoose');
const toId=mongoose.Types.ObjectId
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
   const{title,price,instructor, totalHours, subject, description,subtitles,currency}=req.body
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
           rating : "2"
       })
       await course.save();
      //  const x=course.id;
      //  console.log(x);
      //  filter= {userName:instructor}
      //  instTable.updateOne(
      //    {userName:instructor},
      //    { password: "dddddddddddd" } 
      
      
      // const inst=instTable.findOne(filter).populate('userName');
      // inst.courses.push
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
   console.log(myCourses)
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
    const egpCourses=await courseTable.find({instructor: req.params.instructor, currency:"EGP"})
    const usdCourses=await courseTable.find({instructor: req.params.instructor,currency:"USD"})
    const eurCourses=await courseTable.find({instructor: req.params.instructor,currency:"EUR"})
    if(currencyFilter=="EGP"){
      usdCourses.map((x)=>{
        x.price=x.price*23
        x.currency=currencyFilter
      })
      eurCourses.map((x)=>{
        x.price=x.price*23
        x.currency=currencyFilter
      })
    }
    if(currencyFilter=="USD"){
      egpCourses.map((x)=>{
        x.price=x.price*0.043
        x.currency=currencyFilter
      })
    }
    if(currencyFilter=="EUR"){
      egpCourses.map((x)=>{
        x.price=x.price*0.043
        x.currency=currencyFilter
      })
    }
    let searchResult=[...egpCourses, ...eurCourses,...usdCourses];
    var priceList = searchResult.filter(function (el){
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

module.exports={getAllInst,createCourse,getMyCourses,filterMyCSubject,filterMyCPrice,searchInstCourse};
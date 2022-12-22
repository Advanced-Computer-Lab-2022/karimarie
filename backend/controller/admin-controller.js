const instTable=require("../models/Instructor");
const traineeTable=require("../models/Trainee");
const adminTable=require("../models/Admin");
const requestsTable=require("../models/Requests")
const bcrypt = require('bcrypt')
const refundReqTable=require("../models/RefundReq")
const notificationsTable=require("../models/Notification")
const problemTable = require("../models/Problem");
const courseTable=require("../models/Course");
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

const addInst=async (req,res,next)=>{
    const{firstName,lastName,userName,password}=req.body
    let inst;
    let x= await adminTable.findOne({userName:req.body.userName})
    let y= await traineeTable.findOne({userName:req.body.userName})
    if(x){
        return res.json({success: false, message: 'Username already taken!'});
    }
    else  if(y){
        return res.json({success: false, message: 'Username already taken!'});
    }else {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const inst = await instTable.create({ firstName: firstName, lastName: lastName, password: hashedPassword ,userName:userName});
        await inst.save();
        return res.json({success: true, message: 'Successfully Added!'});
    }
    catch(error){
        //console.log(error)
        instTable.find({userName:req.body.userName},function(err,person){
            if(err){
                return res.json({success: false, message: 'DataBase Error,Please Wait!'});

            }
            else{
                return res.json({success: false, message: 'Username already taken!'});

            }
        })
    }        
}
}

const addCorpTrainee=async (req,res,next)=>{
    const {firstName,lastName,userName,password,email,corporateName}=req.body;
    const type="corporate trainee";
    let corpTrainee;
    let x= await adminTable.findOne({userName:req.body.userName})
    let y= await instTable.findOne({userName:req.body.userName})
    if(x){
        return res.json({success: false, message: 'Username already taken!'});
    }
    else  if(y){
        return res.json({success: false, message: 'Username already taken!'});
    }else {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const corpTrainee = await traineeTable.create({ firstName: firstName, lastName: lastName, password: hashedPassword ,userName:userName,email:email,type:type,corporateName:corporateName});
       
        await corpTrainee.save();
        return res.json({success: true, message: 'Successfully Added!'});
    }
catch(error){
    traineeTable.find({userName:req.body.userName},function(err,person){
        if(err){
            
            return res.json({success: false, message: 'DataBase Error,Please Wait!'});

        }
        else{
            return res.json({success: false, message: 'Username already taken!'});

        }
    
    })
    
}}
}
const addAdmin=async (req,res,next)=>{
    
     const{userName,password}=req.body
     let adm;
     let x= await instTable.findOne({userName:req.body.userName})
     let y= await traineeTable.findOne({userName:req.body.userName}) 
     if(x){
        return res.json({success: false, message: 'Username already taken!'});
    }
    else  if(y){
        return res.json({success: false, message: 'Username already taken!'});
    }else {
     try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const adm = await adminTable.create({ password: hashedPassword ,userName:userName});
         await adm.save();
         return res.json({success: true, message: 'Successfully Added!'});
        }
     catch(err){
         adminTable.find({userName:req.body.userName},function(err,person){
        if(err){
            return res.json({success: false, message: 'DataBase Error,Please Wait!'});

        }
        else{
            return res.json({success: false, message: 'Username already taken!'});

        }
    })}
}
    
}
 const viewReq=async(req,res)=>{ //hayraga3ly array esmo req kol index fe object equivalant to a row in the table
    try{
        let req=await requestsTable.find({});
        return res.status(201).json({req})

    }
    catch(error){      
          return res.status(404).json(error.message)
}
 }

const viewRefundReq=async(req,res)=>{
    try{
        let list=await refundReqTable.find({});
        return res.status(201).json({list})
      
    }
    catch(error){
        return res.json({success: false, message: 'Username already taken!'});

    }
  }
 
  const returnMoney=async(req,res)=>{
    const {id}=req.body;
    console.log("hio")
    try{
        let x=await refundReqTable.findById(id);
        let t=await traineeTable.findById(x.traineeId);



        const fromCurrency=x.currency
        const toCurrency="EGP"
        const base_URL='https://api.exchangerate.host/latest'
        const res1= await axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then( res1=>res1.data);
        const exchangeRate=res1.rates[toCurrency];
        let newm=Math.ceil(((x.amount*exchangeRate)+t.money)*100)/100;
        console.log(newm);
let xx=     await   traineeTable.findOneAndUpdate(
            { _id: x.traineeId },
            { $set:
               {
                 money: newm,
               }
            },  { new: true }
         )
         await traineeTable.findOneAndUpdate({
            _id: x.traineeId},
            {
                $pull: { 'courses': { courseID: x.courseId } }
            })
       
         let del=await refundReqTable.findByIdAndDelete(id);
         let noti;
         noti= new notificationsTable({
             userId:x.traineeId,
             type:"refund",
             message: `An amount of ${newm} has been refunded to your wallet for the  course  ${x.courseName}`
         }) 
         await noti.save();

         return res.json({success: true, message: 'Successfuly Refunded!'});

    }
    catch(error){
        return res.status(404).json(error.message)
    }
 }
 const giveCourse=async(req,res)=>{
    const {id,answer}=req.body;
    let ans="Not Accepted";
    try{
      
        let x=await requestsTable.findById(id);
        let course=await courseTable.findById(x.courses);
        course.numStudents+=1;
        course.save()
        let idd=course._id;
        if(answer.localeCompare('true')==0){
            let trainee= await traineeTable.findOneAndUpdate(
                {
                    _id: x.corpId
                
                },
                { $push: { "courses" : {courseID:idd}} }
             )
             ans="Accepted"
        }
        try{
            // const noti=await notificationsTable.create({
            //     userId:x.corpId,
            //     type:"Course Requested",
            //     message: `Your request of the course: ${x.courseName} has been ${ans}!`
            // })
            let noti;
            noti= new notificationsTable({
                userId:x.corpId,
                type:"Course Requested",
                message: `Your request of the course: ${x.courseName} has been  ${ans}!`
            }) 
            await noti.save();
   
    
        }
        catch(error){  return res.status(404).json(error.message)}
        let del=await requestsTable.findByIdAndDelete(id);

        return res.status(200).json({ del });

    }
    catch(error){
        return res.status(404).json(error.message)
    }

}
const getReports= async (req, res) => {
    try {
      const report = await problemTable.find({});
      return res.status(200).json({ report });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  }
const editReport = async (req, res) => {
    const probId = req.body.id;
    const Status  = req.body.Status;
    if (probId!="") {
      const finalres = await problemTable.findByIdAndUpdate(
        probId,
        {
          Status: Status,
        },
        { new: true }
      );
      await res.status(200).json(finalres);
      if(Status=="Resolved"){
        problemTable.findOneAndRemove({_id: probId}, req.body, function(err,data)
{
    if(!err){
        console.log("Deleted");
    }
});
      }
    } else {
      res.status(400).json({ error: "couldn't" });
   }
};
module.exports={getAllInst,addInst,addCorpTrainee,returnMoney,getReports,editReport,viewRefundReq,addAdmin,viewReq,giveCourse};
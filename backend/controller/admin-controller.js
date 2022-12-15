const instTable=require("../models/Instructor");
const traineeTable=require("../models/Trainee");
const adminTable=require("../models/Admin");
const requestsTable=require("../models/Requests")
const refundReqTable=require("../models/RefundReq");
const RefundReq = require("../models/RefundReq");
const problemTable = require("../models/Problem");
const courseTable=require("../models/Course");
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
    try{
        inst =new instTable({
            firstName,
            lastName,
            userName,
            password
        })
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

const addCorpTrainee=async (req,res,next)=>{
    const {firstName,lastName,userName,password,email,corporateName}=req.body;
    const type="corporate trainee";
    let corpTrainee;
    try{
        corpTrainee=new traineeTable({
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        password:password,
        email:email,
        type:type,
        money:0,
        corporateName:corporateName

    })
    console.log(corporateName);
        await corpTrainee.save();
       let x= await traineeTable.countDocuments( { firstName: "Nada" } )
       console.log(x);
        return res.json({success: true, message: 'Successfully Added!'});
    }
catch(error){
    traineeTable.find({userName:req.body.userName},function(err,person){
        if(err){
            
            return res.json({success: false, message: 'DataBase Error,Please Wait!'});

        }
        else{
            console.log("ddd")
            return res.json({success: false, message: 'Username already taken!'});

        }
    })
}
}
const addAdmin=async (req,res,next)=>{
    
     const{userName,password}=req.body
     let adm;
     try{
         adm =new adminTable({
             userName,
             password
         })
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
 const viewReq=async(req,res)=>{ //hayraga3ly array esmo req kol index fe object equivalant to a row in the table
    try{
        let req=await requestsTable.find({});
        return res.status(201).json({req})

    }
    catch(error){        return res.status(404).json(error.message)
}
 }
const giveCourse=async(req,res)=>{
    const {id,answer}=req.body;
   console.log(answer);
    try{
      
        let x=await requestsTable.findById(id);
       let m=x._id;
        let course=await courseTable.findById(x.courses);
        let idd=course._id;
        if(answer.localeCompare('true')==0){
            let trainee= await traineeTable.findOneAndUpdate(
                {
                    _id: x.corpId
                
                },
                { $push: { "courses" : idd} }
             )
        }
        requestsTable.findByIdAndRemove(articleId);
        return res.status(200).json({ course });

    }
    catch(error){
        return res.status(404).json(error.message)
    }

}
const refundCourse = async (req, res, next) => {
    const courseid = req.params.id;
    const traineeid = req.params.id2;
    console.log(courseid);
    console.log(traineeid);
    // const { discount, expirationTime } = req.body;
    if (courseid && traineeid) {
      console.log("ana henaaaaa");
  
      const { price } = await courseTable
        .findOne({ _id: courseid })
        .select("price")
        .exec();
      console.log(price);
  
      const { money } = await traineeTable
        .findOne({ _id: traineeid })
        .select("money")
        .exec();
      console.log(money);
  
      const finalamount = price + money;
      console.log(finalamount);
  
      const finalres = await traineeTable.findByIdAndUpdate(
        traineeid,
        {
          money: finalamount,
        },
        { new: true }
      );
  
      return res.status(201).json({ finalres });
    } else {
      return res.status(404).json({ message: "no" });
    }
  };
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
    try{
        console.log(id);
        let x=await refundReqTable.findById(id);
        let t=await traineeTable.findById(x.traineeId);
        let newm=x.amount+t.money;
        console.log(newm);
let xx=     await   traineeTable.findOneAndUpdate(
            { _id: x.traineeId },
            { $set:
               {
                 money: newm,
               }
            },  { new: true }
         )
         let del=await refundReqTable.findByIdAndDelete(id);
         console.log("hey")
         return res.json({success: true, message: 'Successfuly Refunded!'});

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
    console.log("hey")
    const probId = req.body.id;
    const Status  = req.body.Status;
    console.log(probId);
    console.log(Status);
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

module.exports={getAllInst,addInst,addCorpTrainee,addAdmin,viewReq,viewRefundReq,returnMoney,getReports,editReport,giveCourse};
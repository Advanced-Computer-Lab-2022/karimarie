const instTable=require("../models/Instructor");
const traineeTable=require("../models/Trainee");
const adminTable=require("../models/Admin");
const requestsTable=require("../models/Requests")

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
        return res.status(201).json({inst})
    }
    catch(error){
        //console.log(error)
        return res.status(400).json({error: error.message})
    }        
}

const addCorpTrainee=async (req,res,next)=>{
    const {firstName,lastName,userName,password,email}=req.body;
    const type="corporate trainee";
    let corpTrainee;
    try{
        corpTrainee=new traineeTable({
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        password:password,
        email:email,
        type:type

    })
        await corpTrainee.save();
        return res.status(201).json({corpTrainee});
}
catch(error){
    return res.status(400).json({error:error.message})
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
         return res.status(201).json({adm})
     }
     catch(err){ return res.status(404).json({message:"no"})}
    
    
 }
 const viewReq=async(req,res)=>{ //hayraga3ly array esmo req kol index fe object equivalant to a row in the table
    try{
        let req=await requestsTable.find({});
        return res.status(201).json({req})

    }
    catch(error){        return res.status(404).json(error.message)
}
 }
 
module.exports={getAllInst,addInst,addCorpTrainee,addAdmin,viewReq};
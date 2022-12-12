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
    let x= await adminTable.findOne({userName:req.body.userName})
    let y= await traineeTable.findOne({userName:req.body.userName})
    if(x){
        return res.json({success: false, message: 'Username already taken!'});
    }
    else  if(y){
        return res.json({success: false, message: 'Username already taken!'});
    }else {
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
}

const addCorpTrainee=async (req,res,next)=>{
    const {firstName,lastName,userName,password,email}=req.body;
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
        corpTrainee=new traineeTable({
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        password:password,
        email:email,
        type:type

    })
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
const instTable=require("../models/Instructor");
const traineeTable=require("../models/Trainee");
const adminTable=require("../models/Admin");
const requestsTable=require("../models/Requests")

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
 
module.exports={getAllInst,addInst,addCorpTrainee,addAdmin,viewReq};
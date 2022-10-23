const instTable=require("../models/Instructor");
const admTable=require("../models/Admins");

const getAllInst=async(req,res,next)=>{
    console.log("heys")
    const{firstName,lastName,userName,password}=req.body
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
        console.log("heys")
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
    
        }
        catch(err){
            console.log(err)
        }
        if(!inst){
            return res.status(404).json({message:"no"})
        }
        return res.status(201).json({inst})
}


const addAdm=async (req,res,next)=>{
   // console.log("heys")
    const{userName,password}=req.body
    let adm;
    try{
        adm =new admTable({
            userName,
            password
        })
        await adm.save();

    }
    catch(err){
        console.log(err)
    }
    if(!adm){
        return res.status(404).json({message:"no"})
    }
    return res.status(201).json({adm})
}


module.exports={getAllInst,addInst,addAdm};
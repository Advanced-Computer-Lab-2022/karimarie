const instTable=require("../models/Instructor");

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

module.exports={getAllInst,addInst};
const instTable=require("../models/Instructor");
const traineeTable=require("../models/Trainee");
const adminTable=require("../models/Admin");
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
    console.log(password)
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
 const addI = async(req,res)=>{
    const {name,password,gender,email,username} = req.body 
    console.log("heyy")
   //console.log(name)
    try {
        const instructor = new instTable({name,password,gender,email})
        await instructor.save()
        
        //const token = createToken(instructor._id)
    
       
        res.status(200).json({instructor})

       }
       catch(error){
        res.status(400).json({error: error.message})
       }
}
module.exports={getAllInst,addInst,addCorpTrainee,addAdmin,addI};
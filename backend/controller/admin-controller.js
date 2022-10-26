const instTable=require("../models/Instructor");
const traineeTable=require("../models/Trainee");

const getAllInst=async(req,res,next)=>{
    //console.log("heys")
    const{firstName,lastName,userName,password}=req.body
    let inst;
    try{
      inst=await instTable.find({});
      return res.status(200).json(inst)
    }
    catch(error){
        return res.status(400).json({error : error.message});
      // console.log(err);
    }
    
}
const addInst=async (req,res,next)=>{
        //console.log("heys")
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
    console.log("heyy");
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
        console.log({firstName});
        await corpTrainee.save();
        return res.status(201).json({corpTrainee});
    }
    catch(error){
        return res.status(400).json({error:error.message})
    }

}

module.exports={getAllInst,addInst,addCorpTrainee};
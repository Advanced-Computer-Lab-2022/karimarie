const express=require('express');
const adminRouter=express.Router();
const instTable=require("../models/Instructor");
const {getAllInst,addInst}=require("../controller/admin-controller");
adminRouter.get("/",
//async(req,res,next)=>{
//     let inst;
//  try{
//    inst=await instTable.find();
//  }
//  catch(err){
//     console.log(err);
//  }
//  if(!inst){
//     return res.status(404).json({message:"no"})
//  }
//  return res.status(200).json({inst:inst})
// }
getAllInst)
adminRouter.post("/",
//async(req,res,next)=>{
//     const{firstName,lastName,userName,password}=req.body
//     let inst;
//     try{
//         inst =new instTable({
//             firstName,
//             lastName,
//             userName,
//             password
//         })
//         await inst.save();

//     }
//     catch(err){
//         console.log(err)
//     }
//     if(!inst){
//         return res.status(404).json({message:"no"})
//     }
//     return res.status(201).json({inst})
// }
addInst)
module.exports=adminRouter;
const express=require('express');
const adminRouter=express.Router();
const instTable=require("../models/Instructor");
const admTable=require("../models/Admins");


const {getAllInst,addInst,addAdm}=require("../controller/admin-controller");

    adminRouter.get("/",getAllInst)
    adminRouter.post("/",addInst)
    adminRouter.post("/admin",addAdm)

   


    module.exports=adminRouter;
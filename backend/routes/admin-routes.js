const express=require('express');
const adminRouter=express.Router();
const instTable=require("../models/Instructor");
const {getAllInst,addInst}=require("../controller/admin-controller");

    adminRouter.get("/",getAllInst)
    adminRouter.post("/",addInst)
    module.exports=adminRouter;
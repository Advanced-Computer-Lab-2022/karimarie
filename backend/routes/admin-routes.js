const express=require('express');
const adminRouter=express.Router();
const {getAllInst,addInst,addCorpTrainee,addAdmin}=require("../controller/admin-controller");

    adminRouter.get("/",getAllInst)
    adminRouter.post("/addInst",addInst)
    adminRouter.post("/addCorpTrainee",addCorpTrainee)
    adminRouter.post("/addAdmin",addAdmin)
    module.exports=adminRouter;
const express=require('express');
const adminRouter=express.Router();
const {getAllInst,addInst,addCorpTrainee,addAdmin,viewReq,viewRefundReq,returnMoney,getReports,editReport,giveCourse}=require("../controller/admin-controller");

    adminRouter.get("/",getAllInst)
    adminRouter.post("/addInst",addInst)
    adminRouter.post("/addCorpTrainee",addCorpTrainee)
    adminRouter.post("/addAdmin",addAdmin)
    adminRouter.get("/viewReq",viewReq);
    adminRouter.post("/giveCourse",giveCourse);
    adminRouter.get("/viewRefundReq",viewRefundReq);
    adminRouter.post("/returnMoney",returnMoney);
    adminRouter.get("/getReports",getReports);
    adminRouter.post("/editReport",editReport);
    module.exports=adminRouter;
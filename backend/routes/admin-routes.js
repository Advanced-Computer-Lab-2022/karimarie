const express=require('express');
const adminRouter=express.Router();
const {getAllInst,addInst,addCorpTrainee,viewRefundReq,giveCourse,getReports,editReport,returnMoney,addAdmin,viewReq}=require("../controller/admin-controller");

    adminRouter.get("/",getAllInst)
    adminRouter.post("/addInst",addInst)
    adminRouter.post("/addCorpTrainee",addCorpTrainee)
    adminRouter.post("/addAdmin",addAdmin)
    adminRouter.get("/viewReq",viewReq);
    adminRouter.post("/returnMoney",returnMoney);
    adminRouter.get("/viewRefundReq",viewRefundReq);
    adminRouter.post("/giveCourse",giveCourse);
    adminRouter.get("/getReports",getReports);
    adminRouter.post("/editReport",editReport);
    module.exports=adminRouter;
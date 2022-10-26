const express=require('express');
const adminRouter=express.Router();
const instTable=require("../models/Instructor");
const traineeTable=require("../models/Trainee");
const {getAllInst,addInst, addCorpTrainee}=require("../controller/admin-controller");

    adminRouter.get('/',getAllInst)
    adminRouter.post('/addInstructor',addInst)
    adminRouter.post('/addCorpTrainee',addCorpTrainee)
    module.exports=adminRouter;
const express=require('express');
const loginRouter=express.Router();

const {login}=require("../controller/starting-controller");

loginRouter.post("/login",login)
module.exports=loginRouter;

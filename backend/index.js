const express = require("express");
const mongoose = require('mongoose');
const app=express();
app.use(express.json())
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require("express-validator");
app.use(cookieParser());
const session = require('express-session')
const corsOptions ={
  origin:"http://localhost:3000", 
  credentials:true,            //access-control-allow-credentials:true
}

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    'Access-Control-Expose-Headers', "Set-Cookie"
  );
  next();
});
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:"supersecret",
  cookie:{
    maxAge:1000*60*60,
    sameSite:"none",
    secure:true,
  }
}))
app.set("trust proxy", 1);
const port = process.env.PORT || "2000";
const MongoURI = 'mongodb+srv://networks:user123@cluster0.pvjwiid.mongodb.net/?retryWrites=true&w=majority' ;
//IMPORTING MODELS
const courseTable=require('./models/Course');
const instTable=require('./models/Instructor');
const traineeTable=require('./models/Trainee');
const adminTable=require('./models/Admin');
const subjectTable=require('./models/Subject');
//IMPORTING ROUTES
const instRouter=require('./routes/inst-routes');
const adminRouter=require("./routes/admin-routes");
const allRouter=require("./routes/all-routes");
const corpTraineRouter=require("./routes/corpTrainee-routes");
//Db connection
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})

var{MongoClient}=require('mongodb')
 var client = new MongoClient(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  main().catch(err => console.log(err));
  async function main() {
  
      await client.connect();
      await mongoose.connect(MongoURI);
  
  
       client.close();
  };

//admin use
app.use("/admin",adminRouter);

//instructor use
app.use("/instructor",instRouter);
//course use

//corptrainee use
app.use("/corpTrainee",corpTraineRouter);
//all use
app.use("/",allRouter);//home page of instructor/trainee to view all available courses 
//app.use("/api/inst",startRouter);
app.post("/subject",async (req,res)=>{
  const{title}=req.body
  let subject;
  try{
      subject =new subjectTable({
          title:title
      })
      await subject.save();
      return res.status(201).json({subject:subject})
  }
  catch(err){
      console.log(err)
      return res.status(404).json({message:err.message})
  }
})
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
  return jwt.sign({ name }, "supersecret", {
    expiresIn: maxAge,
  });
};
app.post(
  "/signup",
  check("password")
    .isLength({
      min: 5,
      max: 25,
    })
    .withMessage(
      "Password must be greater than 5 characters and less than 25 characters"
    ),

  async (req, res) => {
    console.log("ana dakhalt");
    const errors = validationResult(req);
    console.log(errors);
    // if (errors[0].body.msg === "Invalid value") {
    //   return res.json({ success: false, msg: "Email already in use" });
    // }
    if (!errors.isEmpty()) {
      console.log("ana fel errors");
      console.log(errors.array());
      return res.json({
        success: false,
        msg: "Password must be greater than 5 characters and less than 25 characters",
      });
    }
    let adminusername = await adminTable.findOne({
      userName: req.body.userName,
    });
    let traineeusername = await traineeTable.findOne({
      userName: req.body.userName,
    });
    let instructorusername = await instTable.findOne({
      userName: req.body.userName,
    });
    let traineeemail = await traineeTable.findOne({
      email: req.body.email,
    });
    if (traineeemail) {
      console.log("ana fel emAIL");
      return res.json({
        success: false,
        msg: "Email entered is already taken",
      });
    }
    if (adminusername) {
      return res.json({ success: false, msg: "Username already taken!" });
    } else if (traineeusername) {
      console.log("ana fel traineeUsername");

      return res.json({ success: false, msg: "Username already taken!" });
    } else if (instructorusername) {
      return res.json({ success: false, msg: "Username already taken!" });
    } else {
      const {
        email,
        password: plainTextPassword,
        firstName,
        lastName,
        userName,
        gender,
      } = req.body;
      console.log(plainTextPassword);
      const salt = await bcrypt.genSalt();
      //const password = await bcrypt.hash(plainTextPassword, salt);
      
      const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

      const type = "individual trainee";
      const money = 0;

      let Trainee;
      try {
        Trainee = await traineeTable.create({
          email,
          password:hashedPassword,
          firstName,
          lastName,
          userName,
          gender,
          type,
          money: money,
        });
        await Trainee.save();
        const token = createToken(Trainee._id);
        res
          .status(200)
          .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ token, msg: "Individual Trainee" });
      } catch (error) {
        console.log("errormessage" + error.message);
        return res.status(400).json({ error: error.message });
      }
    }
  }
);
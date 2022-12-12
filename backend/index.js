const express = require("express");
const mongoose = require('mongoose');
const app=express();
app.use(express.json())
const cors = require('cors')
const cookieParser = require('cookie-parser');
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
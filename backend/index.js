require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const app=express();
app.use(express.json())
const port = process.env.PORT;
const MongoURI =process.env.MongoURI ;
//IMPORTING MODELS
const courseTable=require('./models/Course');
const instTable=require('./models/Instructor');
const traineeTable=require('./models/Trainee');
//IMPORTING ROUTES
const instRouter=require('./routes/inst-routes');
const adminRouter=require("./routes/admin-routes");
const loginRouter=require("./routes/login-routes");
//Db connection
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server

app.get('/', (req, res) => {
  res.json({mssg: 'Welcome to the app'})
})
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})

var{MongoClient}=require('mongodb');
const { login } = require('./controller/starting-controller');
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
app.use('/admin',adminRouter);

//instructor use
app.use("/instructor",instRouter);

//course use

//trainee use

//login use
app.use("/login",loginRouter);
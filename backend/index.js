require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const app=express();
app.use(express.json())
const port =  process.env.PORT;
const MongoURI = process.env.MONG_URI;
//IMPORTING MODELS
const courseTable=require('./models/Course');
const instTable=require('./models/Instructor');
//IMPORTING ROUTES
const instRouter=require('./routes/inst-routes');
const adminRouter=require("./routes/admin-routes");
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
app.use("/inst",adminRouter);

//instructor use

//course use
app.use("/search",instRouter);
//trainee use
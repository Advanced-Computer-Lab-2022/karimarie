require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const app=express();
app.use(express.json())
const port = process.env.PORT;
 
//IMPORTING MODELS
const courseTable=require('./models/Course');
const instTable=require('./models/Instructor');
const admTable=require('./models/Admins');
//IMPORTING ROUTES
const instRouter=require('./routes/inst-routes');
const adminRouter=require("./routes/admin-routes");
//Db connection
mongoose.connect(process.env.MONGO_URI)
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
 var client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  main().catch(err => console.log(err));
  async function main() {
  
      await client.connect();
      await mongoose.connect(process.env.MONGO_URI);
  
  
       client.close();
  };

//admin use
app.use("/inst",adminRouter);
app.use("/search",instRouter);

//instructor use

//course use

//trainee use
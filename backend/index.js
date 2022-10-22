const express = require("express");
const mongoose = require('mongoose');
const app=express();
const port = process.env.PORT || "2000";
const MongoURI = 'mongodb+srv://networks:user123@cluster0.pvjwiid.mongodb.net/?retryWrites=true&w=majority' ;
const courseTable=require('./models/Course');
app.use(express.json())
const instTable=require('./models/Instructor');
const instRouter=require('./routes/inst-routes');
const adminRouter=require("./routes/admin-routes");
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
//app.use("/inst",instRouter);
// app.post("/", (req,res)=>{
//     console.log("hi");
//     //const{title,price,rating,instructor,totalHours,subject,description}=req.body;

//     const course=new courseTable({
//         title,
//         price,
//         rating,
//         instructor,
//         totalHours,
//         subject,
//         description     
//     })
//     try{
//          course.save();
//     }catch(err){
//         return console.log(err)
//     }
//     return res.status(200).json({course})
// })

// app.post("/",async (req,res)=>{
//     // const{firstName,lastName,userName,password}=req.body;
//     const inst=new instTable({
//         firstName:req.body.firstName,
//         lastName:req.body.lastName,
//         userName:req.body.userName,
//         password:req.body.password,
//     })
//     try{
//        const result = await inst.save()
//    }catch(err){
//        return console.log(err)
//    }
//    res.json(result);
// })
// app.get("/hi/:name",(req,res)=>{
//     res.send("hi"+req.params.name);
// })
app.use("/inst",adminRouter);
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ProblemSchema=new Schema({
    ReportById:{
        type: String,
        required: true
     },
     ReportByName:{
         type: String
      },
      ReportByType:{
         type: String
      },
     CourseId:{
         type: mongoose.Schema.ObjectId,
         ref: "Course",
         required: true
     },
     CourseName:{
        type: String
        },
     Type:{
         type:String,
         required: true
     },
     Report:{
         type:String,
         required: true
     },
     Status:{
        type:String
     } 
   
 
 });
const Problem = mongoose.model('Problem', ProblemSchema);
module.exports=Problem;


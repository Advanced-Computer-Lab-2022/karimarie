const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const coursesSchema=new Schema({
    title:{
        type:String,
        required:isMyFieldRequired
    },
    price:{
        type:Number,
        required:true,
        default:0,
        min:0
    },
    rating:{
        type:Number
    },
    instructor:{
        type:mongoose.Schema.ObjectId,
        ref:"Instructor",
        required:isMyFieldRequired
    },
    totalHours:{
        type:Number,
        required:isMyFieldRequired
    },
    subject:{
        type:String,
        required:isMyFieldRequired
    },
    description:{
        type:String,
        required:isMyFieldRequired
    },
    subtitles:{
        type:String,
        required:isMyFieldRequired
    },
    numStudents:{
        type:Number
    }
});


function isMyFieldRequired() {
    return typeof this.myField === "string" ? false : true;
  }
const Course = mongoose.model('Course', coursesSchema);
module.exports = Course;
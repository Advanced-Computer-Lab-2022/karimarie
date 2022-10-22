const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const coursesSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        
    },
    rating:{
        type:Number,
        required:true,
        minlength:6
    },
    instructor:{
       type:mongoose.Types.ObjectId,
       ref:"Instructor",
       required:true
    },
    totalHours:{
        type:Number,
        required:true,
    },
    subject:{
        type:String,
        required:true, 
    },
    description:{
        type:String,
        required:true,
    },
    numStudents:{
        type:Number
    }
});
const Course = mongoose.model('Course', coursesSchema);
module.exports = Course;
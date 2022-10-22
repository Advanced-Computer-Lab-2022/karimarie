const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const coursesSchema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
        
    },
    userName:{
        type:String,
        required:true,
        minlength:6
    },
    password:{
       type:String,
       required:true
    },
    gender:{
        type:char,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    courses:[{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    }],
    type:{
        type:String,
        required: true
    }
});
const Trainee = mongoose.model('Trainee', Trainee);
module.exports = Trainee;
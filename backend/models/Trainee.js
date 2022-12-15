const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const traineeSchema=new Schema({
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
        unique:true
    },
    password:{
       type:String,
       required:true
    },
    gender:{
        type:String,
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
        type:String
    },
    money:{
        type:Number
    },
    corporateName:{
        type:String
    }
});
const Trainee = mongoose.model('Trainee', traineeSchema);
module.exports = Trainee;
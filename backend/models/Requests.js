const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const requestsSchema=new Schema({
    corpId:{
        type:mongoose.Schema.ObjectId, ref: "Trainee"
    },
    corpName:{
        type:String
    },
    courses:[
    {
        courseId:{type: mongoose.Schema.ObjectId, ref: "Course"},
        courseName:{type:String},
        courseInstructor:{type:String},
        status:{type:Boolean}
    }
    ]
});
const Requests = mongoose.model('Requests', requestsSchema);
module.exports=Requests;
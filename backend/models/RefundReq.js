const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const RefundReqSchema=new Schema({
    traineeId: {
        type:mongoose.Schema.ObjectId,
        ref:"Instructor"
    },
    courseId: {
        type:mongoose.Schema.ObjectId,
        ref:"Course"
    },
    courseName:{
        type:String
    },
    traineeName:{
        type:String
    },
    amount:{
       type:Number
    },
    currency:{
        type:String
    }
});
const RefundReq = mongoose.model('RefundReq', RefundReqSchema);
module.exports = RefundReq;
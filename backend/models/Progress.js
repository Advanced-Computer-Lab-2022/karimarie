const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const progressSchema=new Schema({
    traineeID: {
        type:mongoose.Schema.ObjectId,
        ref:"Trainee"
    },
    progress: {
        type: Number,
        default:0
    },
    courseID:{
        type:mongoose.Schema.ObjectId,
        ref:"Course"
    },
    videoID:{
        type:String
    }
});
const progressTable = mongoose.model('progressTable', progressSchema);
module.exports = progressTable;
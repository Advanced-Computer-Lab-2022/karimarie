const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const subjectsSchema=new Schema({
    title:{
       type:String,
       required:true
    }
});
const Subject = mongoose.model('Subjects', subjectsSchema);
module.exports = Subject;
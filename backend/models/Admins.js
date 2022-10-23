const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const adminSchema=new Schema({
    userName:{
        type:String,
        required:true,
    },
    password:{
       type:String,
       required:true
    }
});
const Admnila = mongoose.model('Admins', adminSchema);
module.exports = Admnila;

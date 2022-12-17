const mongoose=require('mongoose');
const {ObjectId} = mongoose.Schema;
const Schema=mongoose.Schema;

const NotificationSchema=new Schema({
    userId:{
        type:String,
        
    },
    type:{
        type:String
    },
    message:{
        type:String
    }
});
const Notification = mongoose.model('Notification', NotificationSchema);
module.exports=Notification;
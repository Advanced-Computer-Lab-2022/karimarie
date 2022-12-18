const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const requestsSchema=new Schema({
        corporateName:{type:String},
        corpId:{
            type:mongoose.Schema.ObjectId, ref: "Trainee"
        },
        corpName:{
            type:String
        },
        courses:
        {
            type: mongoose.Schema.ObjectId, ref: "Course",
        },
        courseName:{
            type:String

        },
        courseInstructor:{type:String},
        status:{type:Boolean},
        price:{
            type:Number
        },
        currency:{
            type:String
        }
        

        
    

    
   
});
const Requests = mongoose.model('Requests', requestsSchema);
module.exports=Requests;
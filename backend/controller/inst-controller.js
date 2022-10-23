const courseTable=require("../models/Course");
const mongoose = require('mongoose');


const searchCourse = async (req, res) =>{
    await courseTable.findOne({'title': req.body.name}, function (err, result) {
        // if(!mongoose.Types.title.isValid(id)){
        //     return res.status(404).json({error :'No such title for course'})
        // }
        if (err) {
            
            return res.status(404).json({error :'No such title for course'})
        }else{
            res.status(200).json({result});

        }
       
      }).clone().catch(function(err){ console.log(err)});
     
      
    
}




module.exports=searchCourse;

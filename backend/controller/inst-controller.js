const courseTable=require("../models/Course");
const mongoose = require('mongoose');




const searchCourse = async (req, res) =>{
    await courseTable.findOne({'title': req.body.name}, function (err, result) {
    
        if (result) {
            res.status(200).json({result});
           
            
        }else{
             courseTable.findOne({'subject': req.body.sub}, function (err, result){
                if(result){
                    res.status(200).json({result});
                }
            
            else{
                courseTable.findOne({'instructor': req.body.inst}, function (err, result){
                    console.log(result);
                    if(result){
                        res.status(200).json({result});
                    }
                
                else{
                    
                    return res.status(404).json({error :'Invalid Input'})
                }
        
            })
            
                
            }

        })
       
       
      }}).clone().catch(function(err){ console.log(err)});   
    }

module.exports=searchCourse;


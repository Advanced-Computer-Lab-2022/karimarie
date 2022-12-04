import React from 'react'
import { Avatar,Box,Card,CardContent,CardHeader,CardMedia,IconButton,Typography, Button,CardActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseDetails from '../pages/CourseDetails';
import axios from "axios";


const Subtitles = ({title,Video,totalHours,shortDescription,subtitleID,type}) => {
    const [exam,isExamAvailable]=useState(false);

    const sendRequest2 = async () => {
        const res = await axios
          .get(`http://localhost:2000/getExamSol/${subtitleID}`)
          .catch((err) => console.log(err));
        const data = await res.data;
        return data;
      };
      useEffect(() => {
       sendRequest2().then((data)=>{
        if(data.exam.toString().localeCompare([])===0){
          isExamAvailable(false)
        }else {
          isExamAvailable(true)
        }
       })
    
      }, []);
    return (

        <div>
           
            <Card sx={{  width: "450px",
              marginLeft: "20px",
              mt: 2,
              padding: 2,
              boxShadow: "5px 5px 10px #ccc",
              ":hover": {
              boxShadow: "10px 10px 20px #ccc"}}}>
                
                  
         
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
           title : {title}
            </Typography>
            <div class="ratio ratio-16x9">
            <iframe src={Video} title="YouTube video" allowfullscreen></iframe>
            </div>
            <Typography variant="body2" color="text.secondary">
            Total Hours : {totalHours}
            </Typography>
            <Typography variant="body2" color="text.secondary">
           Short Description : {shortDescription}
            </Typography>
            {type==='CorpTrainee' && exam &&
      <a href={`/myExam/${subtitleID}`} > Solve Exam</a>}
          </CardContent>
         
          <CardActions>
              <Button size="small" > </Button>
            <Button size="small">Learn More</Button>
            
          </CardActions>
        
    
          
        </Card>
    
        </div>
        
      )
}
export default Subtitles
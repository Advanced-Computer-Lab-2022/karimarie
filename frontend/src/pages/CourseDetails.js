import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {  useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function CourseDetails() {
    
    const id = useParams().id;
    const newprice=useParams().newPrice;
    const currencyP=useParams().currencyP;
    const [Course, setCourses]= useState([''])

    const sendRequest = async () => {
        const res = await axios
          .get( `http://localhost:2000/getByid/${id}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => setCourses(data.course));
        
      }, []);

     
      





      
  return (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Course ID : {Course.instructor}
            </Typography>
            <Typography variant="h5" component="div">
            Course Title : {Course.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
             Course Subject : {Course.subject}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Course Price : {newprice} {currencyP}
            </Typography>
            {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {Course.subtitles}
            </Typography> */}
            <Typography variant="body2">
             Course Rating : {Course.rating}
              <br />
            Course Description : {Course.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
          
         
   



        </Card>


      );

 


  
}

export default CourseDetails
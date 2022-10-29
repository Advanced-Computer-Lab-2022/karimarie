import React, { useState } from 'react'
import { Avatar,Box,Card,CardContent,CardHeader,CardMedia,IconButton,Typography, Button,CardActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const AllCourses2 = ({title,price,totalHours}) => {
  const navigate = useNavigate();
  const [id,setCourseId]=useState()
  // const viewDetails = (e) => {
  //  setCourseId(id);
  //  navigate("/myCourse/${id}")
  //   console.log("aaaaaa",id);
   

  // };
  return (
    <div>
       
        <Card sx={{  width: "450px",
          marginLeft: "20px",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
          boxShadow: "10px 10px 20px #ccc"}}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
       // image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
       
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
        
      </CardActions>

      <button >View Details</button>
    </Card>
    </div>
  )
}

export default AllCourses2
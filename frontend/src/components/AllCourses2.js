import React, { useState } from 'react'
import { Avatar,Box,Card,CardContent,CardHeader,CardMedia,IconButton,Typography, Button,CardActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const AllCourses2 = ({id,title,price,totalHours,rating}) => {
  const navigate = useNavigate();
  const [idF,setCourseId]=useState()
  const viewDetails = (e) => {
   setCourseId(id);
    console.log("aaaaaa",id);
   navigate("/myCourse/${id}")

  };
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
        {rating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {totalHours}
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
        
      </CardActions>

      <button onClick={viewDetails}>View Details</button>
    </Card>
    </div>
  )
}

export default AllCourses2
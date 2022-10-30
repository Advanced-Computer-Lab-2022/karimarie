import React, { useState,useEffect } from 'react'
import { Avatar,Box,Card,CardContent,CardHeader,CardMedia,IconButton,Typography, Button,CardActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const AllCourses2 = ({id,title,price,totalHours,rating}) => {
  const [showText, setShowText] = useState(true);
  useEffect(() => {
    if(!price){
      setShowText(false); 
     }
  }, []);
  
  const navigate = useNavigate();
  const [idF,setCourseId]=useState()
  const Text = () => <div>price : {price}</div>;
  return (
    <div>
       
        <Card sx={{  width: "450px",
          marginLeft: "20px",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
          boxShadow: "10px 10px 20px #ccc"}}}>
           <a href={`/course/${id}`} >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
       // image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Rating : {rating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Title :{title}
        </Typography>
        <Typography variant="body2" color="text.secondary">  
          {showText ? <Text /> : null}  
        </Typography>
        <Typography variant="body2" color="text.secondary">
         TotalHours :{totalHours}
        </Typography>
       
      </CardContent>
      </a>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
        
      </CardActions>

    </Card>
    </div>
    
  )
  
}

export default AllCourses2
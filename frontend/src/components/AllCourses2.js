import React from 'react'
import { Avatar,Box,Card,CardContent,CardHeader,CardMedia,IconButton,Typography, Button,CardActions } from "@mui/material";
const AllCourses2 = ({title,price,totalHours}) => {
    console.log(title)
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
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default AllCourses2
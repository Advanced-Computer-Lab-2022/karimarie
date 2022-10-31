import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar,Box,Card,CardContent,CardHeader,CardMedia,IconButton,Typography, Button,CardActions } from "@mui/material";
import AllCourses2 from '../AllCourses2';
const FilterSubject = ({subject,show}) => {
    console.log(show)
    const [courses, setCourses] = useState([]);
    const sendRequest = async () => {
   
        const res = await axios
          .get(`http://localhost:2000/filterS/${subject}`)
          .catch((err) => console.log(err));
          const data = await res.data;
    
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => setCourses(data.courseList));
        
      }, []);
  return (
    <React.Fragment>
          {show==='CorpTrainee' && courses &&
      courses.map((courses) => (
        <AllCourses2
          title={courses.title}
          totalHours={courses.totalHours}
          rating={courses.rating}
          currency={courses.currency}
        />
      ))}
      {show!=='CorpTrainee' && courses &&
      courses.map((courses) => (
        <AllCourses2
          title={courses.title}
          price={courses.price}
          totalHours={courses.totalHours}
          rating={courses.rating}
          currency={courses.currency}
        />
        
      ))}
    </React.Fragment>
  )

}

export default FilterSubject
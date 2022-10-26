import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar,Box,Card,CardContent,CardHeader,CardMedia,IconButton,Typography, Button,CardActions } from "@mui/material";
import AllCourses2 from '../AllCourses2';
const FilterSubject = ({subject}) => {
  
    const [courses, setCourses] = useState([]);
    const sendRequest = async () => {
   
        const res = await axios
          .get(`http://localhost:2000/filterS/${subject}`)
          .catch((err) => console.log(err));
          const data = await res.data;
    
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => setCourses(data.courses));
        
      }, []);
  return (
    <React.Fragment>
          {courses &&
      courses.map((courses) => (
        <AllCourses2
          title={courses.title}
          price={courses.price}
          totalHours={courses.totalHours}
        />
      ))}
      <p>hey</p>
    </React.Fragment>
  )

}

export default FilterSubject
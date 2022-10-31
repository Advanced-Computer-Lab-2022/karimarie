import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar,Box,Card,CardContent,CardHeader,CardMedia,IconButton,Typography, Button,CardActions } from "@mui/material";
import AllCourses2 from '../../AllCourses2';
const FilterSubject = ({subject,instructor}) => {
  
    const [courses, setCourses] = useState([]);
    const sendRequest = async () => {
   
        const res = await axios
          .get(`http://localhost:2000/instructor/filterMySub/${instructor}/${subject}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => setCourses(data));
        console.log(courses.title)
      }, []);
  return (
    <React.Fragment>
          {courses &&
      courses.map((courses) => (
        <AllCourses2
          id={courses._id}
          title={courses.title}
          price={courses.price}
          totalHours={courses.totalHours}
          rating={courses.rating}
          currency={courses.currency}
        />
      ))}
      <p>hey</p>
    </React.Fragment>
  )

}

export default FilterSubject
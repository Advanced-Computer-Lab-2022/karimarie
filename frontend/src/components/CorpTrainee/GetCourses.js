import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import AllCourses2CT from './AllCourses2CT';
import { Typography } from '@mui/material';
const GetCourses = () => {
    const [courses, setCourses] = useState([]);
    const sendRequest = async () => {
        const res = await axios
          .get("http://localhost:2000/home")
          .catch((err) => console.log(err));
          const data = await res.data;
    
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => setCourses(data.courses));
        
      }, []);
  return (
    <div>
    {courses &&
      courses.map((courses) => (
        <AllCourses2CT
          title={courses.title}
          totalHours={courses.totalHours}
          rating={courses.rating}
        />
      ))}
  </div>
  )
}

export default GetCourses
import { useState } from 'react'
import { Typography } from '@mui/material'
import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import AllCourses2 from '../AllCourses2';
const FilterRating = ({rating}) => {
    const [courses, setCourses] = useState([]);
        const sendRequest = async () => {
            const res = await axios
            .get(`http://localhost:2000/ratefilter/${rating}`)
            .catch((err) => console.log(err));
            const data = await res.data;
            console.log("hi");
            return data;
          };
        useEffect(() => {
            sendRequest().then((data) => setCourses(data.RcourseList));
            console.log(courses)
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
    </React.Fragment>
   
  )


      }
export default FilterRating
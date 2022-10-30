import { useState } from 'react'
import { Typography } from '@mui/material'
import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import AllCourses2 from '../../AllCourses2';
const FilterPrice = ({instructor,price}) => {
    console.log(instructor);
    const [courses, setCourses] = useState([]);
        const sendRequest = async () => {
            const res = await axios
            .get(`http://localhost:2000/instructor/filterMyPrice/${instructor}/${price}`)
            .catch((err) => console.log(err));
            const data = await res.data;
            console.log(data + "okkkkkk");
            return data;
          };
        useEffect(() => {
            sendRequest().then((data) => setCourses(data));
            console.log("hi")
          }, []);
      
   
   
  return (
    <React.Fragment>
       {courses &&
      courses.map((courses) => (
        <AllCourses2
          title={courses.title}
          price={courses.price}
          totalHours={courses.totalHours}
          rating={courses.rating}
        />
      ))}
    </React.Fragment>
   
  )


      }
export default FilterPrice
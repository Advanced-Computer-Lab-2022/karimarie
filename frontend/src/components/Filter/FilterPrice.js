import { useState } from 'react'
import { Typography } from '@mui/material'
import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import AllCourses2 from '../AllCourses2';
const FilterPrice = ({price}) => {
    const [courses, setCourses] = useState([]);
        const sendRequest = async () => {
            const res = await axios
            .post("http://localhost:2000/filterP", {
              price:{price}
            })
            .catch((err) => console.log(err));
            const data = await res.data;
            return data;
          };
        useEffect(() => {
            sendRequest().then((data) => setCourses(data.priceList));
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
export default FilterPrice
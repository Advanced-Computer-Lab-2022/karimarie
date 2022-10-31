import { useState } from 'react'
import { Typography } from '@mui/material'
import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import AllCourses2 from '../../AllCourses2';
const FilterPrice = ({instructor,price,currencyFilter}) => {
    const [courses, setCourses] = useState([]);
        const sendRequest = async () => {
            const res = await axios
            .get(`http://localhost:2000/instructor/filterMyPrice/${instructor}/${price}/${currencyFilter}`)
            .catch((err) => console.log(err));
            const data = await res.data;
            console.log(data)
            return data;
          };
        useEffect(() => {
            sendRequest().then((data) => setCourses(data.priceList));
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
          currency={courses.currency}
        />
      ))}
    </React.Fragment>
   
  )


      }
export default FilterPrice
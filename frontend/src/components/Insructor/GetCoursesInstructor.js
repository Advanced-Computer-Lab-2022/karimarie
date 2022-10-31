import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import AllCourses2 from '../AllCourses2';
import { Button, Typography } from '@mui/material';

const GetCoursesInstructor = ({instructorID}) => {
    const [courses, setCourses] = useState([]);
    const sendRequest = async () => {
        const res = await axios
          .get(`http://localhost:2000/instructor/instCourses/${instructorID}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => setCourses(data));
      }, []);
    return ( 
        <React.Fragment>
        <div>
        {courses &&
          courses.map((courses) => (
            <AllCourses2
            title={courses.title}
            id={courses._id}
            price={courses.price}
            rating={courses.rating}
            currency={courses.currency}
            type="Instructor"
            totalHours={courses.totalHours}
            />
          ))}
      </div>
      </React.Fragment>
     );
}
 
export default GetCoursesInstructor;
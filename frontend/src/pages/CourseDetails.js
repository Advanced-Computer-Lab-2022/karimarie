import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const CourseDetails = () => {
    const id = useParams().id;
    const [courses, setCourses] = useState([]);
    console.log(id)
    const sendRequest = async () => {
        const res = await axios
          .get( `http://localhost:2000/getByid/${id}`)
          .catch((err) => console.log(err));
          const data = await res.data;
    
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => setCourses(data.course));
        
      }, [id]);
  return (
  <React.Fragment>
    <p>Hello</p>
  </React.Fragment>


  )
}

export default CourseDetails
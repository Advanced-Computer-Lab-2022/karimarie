import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import AllCourses2 from '../AllCourses2';
import { Button, Typography } from '@mui/material';


import GetCoursesInstructor from './GetCoursesInstructor';


const ViewMyCourses = () => {
    //const [courses, setCourses] = useState([]);
    const [instructor,setInstructor]=useState('');
    const [choose,setChoose]=useState('');

    // const sendRequest = async () => {
    //     const res = await axios
    //       .get("http://localhost:2000/home")
    //       .catch((err) => console.log(err));
    //       const data = await res.data;
    
    //       return data;
    //   };
    //   useEffect(() => {
    //     sendRequest().then((data) => setCourses(data.courses));
        
    //   }, []);
      const HandleSubmit = (e) => {
        console.log(instructor);
        e.preventDefault();
        setChoose('getCourses');
        
      
      }
       
     
    return ( 
        <React.Fragment>
        <form className="create" onSubmit={HandleSubmit} >  
        <h3>Enter Your ID :</h3>
      <input 
        type="text" 
        onChange={(e) => setInstructor(e.target.value)} 
        value={instructor}
      />
      <button>Search</button></form>

      
  <div>
  {choose==="getCourses" && <GetCoursesInstructor
      instructorID={instructor}/>  }
  </div>



        </React.Fragment>


        
     );
}
 
export default ViewMyCourses;
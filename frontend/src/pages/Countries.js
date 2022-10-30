import React from 'react'
import {Link} from 'react-router-dom';
import AllCourses from '../components/AllCourses';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'

  
  const Countries=() =>{
    const navigate = useNavigate();
  
const setC=(e)=>{

   localStorage.setItem("country",e.target.value)
   navigate(`/Choose`);
    //setUse("Egypt")
}



      return (
         <React.Fragment>
  
 
 <Button value= "Egypt"onClick={setC}>Egypt</Button>
 <Button value= "Europe" onClick={setC}>Europe</Button>
 <Button value= "USA"  onClick={setC}>USA</Button>
 
         </React.Fragment>
      )
  }
  
  export default Countries
import React, { useMemo } from 'react'
import {Link} from 'react-router-dom';
import AllCourses from '../components/AllCourses';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import axios from "axios";

const Login=() =>{
    const navigate = useNavigate();
    const [userName,setuserName]=useState('');
    const [password,setpassword]=useState('');
    const [token,setToken]=useState('');
    const sendRequest = async () => {
     
      const res = await axios
      .post('http://localhost:2000/login', {
        userName : userName,
        password :password
      }).then(req=>console.log(req.cookies))
      
      .catch((err) => console.log(err));
    };
    const handleSubmit=()=>{
      sendRequest();
     
    
        navigate('/Home')

    }
    return (
        <React.Fragment>
            <div>
<form className="create" onSubmit={handleSubmit} > 
      <h3>login</h3>
      <input 
        type="text" 
        onChange={(e) => setuserName(e.target.value)} 
        value={userName}
      /> 
      <input 
        type="text" 
        onChange={(e) => setpassword(e.target.value)} 
        value={password}
      /> <button >Login</button>
      </form>

        
      </div>
         </React.Fragment>
    )
}

export default Login
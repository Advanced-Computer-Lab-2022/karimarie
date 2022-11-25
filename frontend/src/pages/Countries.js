import React, { useMemo } from 'react'
import {Link} from 'react-router-dom';
import AllCourses from '../components/AllCourses';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import LocaleCurrency from 'locale-currency'
import axios from "axios";

  
  const Countries=() =>{
    const [countries,setCountries]=useState('');
    const sendRequest2 = async () => {
      const res = await axios
        .get("https://restcountries.com/v2/all")
        .catch((err) => console.log(err));
        const data = await res.data;
       
      const myobj= JSON.stringify(data);
      const myObj1 = JSON.parse(myobj);
      const answer = myObj1.filter((count) => (count.currencies !== undefined))
      
      
      //answer.map((data)=>console.log(data.currencies[0].code))

        return answer;
    };
    useEffect(()=>{
sendRequest2().then((data) => setCountries(data))
   
      
    },[]);
    const [value,setValue]=useState('');
    const options=useMemo(()=> countryList().getData(),[])
    // const options2=countries.map(country=>country.name)
     
    //console.log(options)
    const ChangeHandler=(e)=>{
      var newTxt = e.target.value.split('(');
      var newTxt1=newTxt[0].split(' ');
      var x1=newTxt[1].split(')');
      setValue(e.target.value);
      
      setC(newTxt1,x1);
    }
    const navigate = useNavigate();
  
    const setC=(newTxt,x1)=>{
      // console.log(x1[0])
      // console.log(newTxt[0])
   localStorage.setItem("country",newTxt[0]);

   localStorage.setItem("currency",x1[0])
   navigate(`/Choose`);
    //setUse("Egypt")
}



      return (
         <React.Fragment>
          
  
{/*  
 <Button value= "Egypt"onClick={setC}>Egypt</Button>
 <Button value= "Europe" onClick={setC}>Europe</Button>
 <Button value= "USA"  onClick={setC}>USA</Button> */}
      <div class="container">
      <label for="countries">Choose your Country:</label>
      <Box width="250px">
      <Select options={options} value={value} onChange={ChangeHandler} placeholder="Select"/>
      </Box>
      <h1>{value}</h1>
      <label for="countries">Choose your Country2:</label>
      <Box width="250px">
      <select value={value} onChange={ChangeHandler} placeholder="Select">
      <option>--Select a Country--</option>
      {countries &&
    countries.map( (x) => 
      <option >{x.name} ({x.currencies[0].code})</option> )
  }</select>
      </Box>

        
      </div>
         </React.Fragment>
      )
  }
  
  export default Countries
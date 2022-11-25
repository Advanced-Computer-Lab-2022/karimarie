import { useState } from 'react'
import { Typography } from '@mui/material'
import React from 'react'
import { useEffect } from "react";
import axios from "axios";

const EditProfile = () => {
    const [option,setOption]=useState('');
    const [instructor,setInstructor]=useState('');
    const [editBio,setEditBio]=useState('');
    const [editEmail,setEditEmail]=useState('');
        const sendRequest = async () => {
        if(instructor!=""){
        const res = await axios
        .post(`http://localhost:2000/instructor/editbio/${instructor}`, {
          biography : editBio
        })
        .catch((err) => console.log(err));
    }
      };

      const sendRequest2 = async () => {
        if(instructor!=""){
            console.log(instructor)
        const res = await axios
        .post(`http://localhost:2000/instructor/editemail/${instructor}`, {
          email : editEmail
        })
        .catch((err) => console.log(err));
    }
      };

     const handleaddclick= ()=>{
        sendRequest()
        setInstructor('')
        setOption("")
       
     }
     const handleaddclick2= ()=>{
        console.log(editEmail)
        sendRequest2()
        setInstructor('')
        setOption("")
       
     }
        
       
     useEffect(() => {
        setEditBio('')
        setEditEmail('')
      }, []);

        
    


    return (
        <React.Fragment>

        <h3>Enter Your ID :</h3>
      <input 
        type="text" 
        onChange={(e) => setInstructor(e.target.value)} 
        value={instructor}
      />
      

      <Typography>Edit : </Typography>
     <select className="form-control" onChange={(e) => {
          const optionSelec = e.target.value;
          setOption(optionSelec );
        }} value={option}>
              <option value="" key='1'>Choose An Option</option>
              <option value="Bio" key='2'>Edit Bio</option>
              <option value="Email" key='3' >Edit Email</option>

      </select> 

      {option==="Bio" && 
      <div>
      <label>Enter Your Bio:</label>
      <input 
        type='text' 
        onChange={(e) => setEditBio(e.target.value)} 
        value={editBio} 
      />
      <button onClick={ handleaddclick}>Submit</button>
      </div>}

      {option==="Email" && 
      <div>
      <label>Enter Your Email:</label>
      <input 
        type='text' 
        onChange={(e) => setEditEmail(e.target.value)} 
        value={editEmail} 
      />
      <button onClick={ handleaddclick2}>Submit</button>
      </div>}


        </React.Fragment>
    )
}
export default EditProfile;
import { Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios";

const ForgetPasswordAll = () => {
const [password,setPassword]=useState('')
const [id,setID]=useState('')
const [error, setError] = useState(null)

const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:2000/changepasswordAll", {   
          id:id,
        password:password
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
         
  };
  return (
    <React.Fragment>

     
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Change Your Password</h3>


      <label>Your ID:</label>
      <input 
        type="text" 
        onChange={(e) => setID(e.target.value)} 
        value={id} 
      />

      <label>New Password:</label>
      <input 
        type="text" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button>Change Password</button>
      {error && <div className="error">{error}</div>}
    </form>
   
    </React.Fragment>  
  )
}
export default ForgetPasswordAll;
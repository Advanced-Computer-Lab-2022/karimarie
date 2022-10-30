import { Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios";
const AddAdmin = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:2000/admin/addAdmin", {
        userName: userName,
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
     setUserName('')
     setPassword('')
     setError(null)
  };

  return (
    <React.Fragment>

    
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Admin</h3>


      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUserName(e.target.value)} 
        value={userName} 
      />

      <label>Password:</label>
      <input 
        type="text" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button>Add Admin</button>
      {error && <div className="error">{error}</div>}
    </form>
   
    </React.Fragment>
  )
}

export default AddAdmin;
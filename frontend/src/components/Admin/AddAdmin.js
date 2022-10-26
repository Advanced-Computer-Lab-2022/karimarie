import { Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios";
const AddAdmin = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const admin = {userName,password}
    
  //   const response = await fetch('/admin/addAdmin', {
  //     method: 'POST',
  //     body: JSON.stringify(admin),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   const json = await response.json()

  //   if (!response.ok) {
  //     setError(json.error)
  //   }
  //   if (response.ok) {
  //     setError(null)
  //     setUserName('')
  //     setPassword('')
  //     console.log('new admin added:', json)
  //   }

  // }
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
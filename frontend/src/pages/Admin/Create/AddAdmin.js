import { Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios";
import x from "./Create.module.css";

const AddAdmin = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const[errorM,setErrorM]=useState("");
  const [showError,IsShowError]=useState(false);
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
      .then((data) =>{setErrorM(data.message);setError(data.success);})
      if(!error){
        IsShowError(true);
      }
      if(error){
        IsShowError(false)
        setUserName('')
        setPassword('')
      }
  };
  const SuccMessage = () => (
    <div  className={error ? x.yay : x.error}>{errorM}</div>  
  );
  return (
    <React.Fragment>
  <form onSubmit={handleSubmit}>
<div className={x.box}>
    {showError && <SuccMessage/> }
    <div className={x.xx}>
    <div className={x.elem}>
    <i className={["material-icons-outlined", x.iconn].join(' ')} >account_circle</i>{" "}
    <input className={x.textt} required placeholder="UserName"  onChange={(e) => setUserName(e.target.value)} 
        value={userName}  ></input>
    </div>
    {/* <label className={x.label}>Password</label> */}
    <div className={x.elem}>
    <i className={["material-icons-outlined", x.iconn].join(' ')} >https</i>{" "}
    <input className={x.textt} required placeholder="Password" onChange={(e) => setPassword(e.target.value)} 
        value={password}  ></input>
    </div>
    <button className={x.b}>Create Admin!</button>
    </div>
    </div>
    </form>
   </React.Fragment>
   

  )
}

export default AddAdmin;
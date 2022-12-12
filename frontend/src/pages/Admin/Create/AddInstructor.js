import React from 'react'
import x from "./Create.module.css";
import { useState } from 'react'
import axios from "axios";
import "material-icons/iconfont/material-icons.css";

const AddInstructor = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastname] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const[errorM,setErrorM]=useState("");
  const [showError,IsShowError]=useState(false);
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:2000/admin/addInst", {
        userName: userName,
        password:password,
        firstName:firstName,
        lastName:lastName
      })
      .catch((err) =>{ var json = JSON.parse(err); console.log(typeof json)});
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
        IsShowError(false);
        setFirstName('')
        setLastname('')
        setUserName('')
        setPassword('')
      }

     
  };
const SuccMessage = () => (
  <div  className={error ? x.yay : x.error}>{errorM}</div>  
);
{/* <div className={x.error}>{errorM}</div> */}
 
  return (
   <React.Fragment>
          <form onSubmit={handleSubmit}>

    <div className={x.box}>
      {showError && <SuccMessage/> }
    <div className={x.xx}>
    {/* <label className={x.label}>First Name</label> */}
    <input className={x.textt} placeholder="First Name" required onChange={(e) => setFirstName(e.target.value)}        value={firstName}></input>
    {/* <label className={x.label}>Last Name</label> */}
    <input className={x.textt}  placeholder="Last Name" required onChange={(e) => setLastname(e.target.value)} value={lastName}></input>
    {/* <label className={x.label}>User Name</label> */}
    <div className={x.elem}>
    <i className={["material-icons-outlined", x.iconn].join(' ')} >account_circle</i>{" "}
    <input className={x.textt}  placeholder="UserName" required onChange={(e) => setUserName(e.target.value)} 
        value={userName}  ></input>
    </div>
    {/* <label className={x.label}>Password</label> */}
    <div className={x.elem}>
    <i className={["material-icons-outlined", x.iconn].join(' ')} >https</i>{" "}
    <input className={x.textt}  placeholder="Password"required onChange={(e) => setPassword(e.target.value)} 
        value={password}  ></input>
    </div>
    <button className={x.b}>Create Instructor!</button>
    </div>
    </div>
    </form>
   </React.Fragment>
  )
}

export default AddInstructor
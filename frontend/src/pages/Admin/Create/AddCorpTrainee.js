import axios from "axios";
import x from "./Create.module.css";
import React, { useState } from 'react'

const AddCorpTrainee = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastname] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('') 
  const [error, setError] = useState(null)
  const[errorM,setErrorM]=useState("");
  const [showError,IsShowError]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    sendRequest()
      .then((data) =>{setErrorM(data.message);setError(data.success);})
      console.log(error);
      if(!error){
        IsShowError(true);
      }
      if(error){
        IsShowError(false)
        setFirstName('')
        setLastname('')
        setUserName('')
        setPassword('')
        setEmail('')
      }
    
  }
    const sendRequest = async () => {
      const res = await axios
        .post("http://localhost:2000/admin/addCorpTrainee", {
          firstName: firstName,
          lastName:lastName,
          userName:userName,
          password:password,
          email:email
        })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
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
    {/* <label className={x.label}>First Name</label> */}
    <input className={x.textt} required placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}        value={firstName}></input>
    {/* <label className={x.label}>Last Name</label> */}
    <input className={x.textt} required placeholder="Last Name"  onChange={(e) => setLastname(e.target.value)} value={lastName}></input>
    {/* <label className={x.label}>User Name</label> */}
    <div className={x.elem}>
    <i className={["material-icons-outlined", x.iconn].join(' ')} >email</i>{" "}
    <input className={x.textt} required placeholder="Email" type="email"  onChange={(e) => setEmail(e.target.value)} 
     value={email} 
      ></input>
    </div>
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
 
    <button className={x.b}>Create Corporate Trainee!</button>
    </div>
    </div>
    </form>
   </React.Fragment>
    
  )
}

export default AddCorpTrainee;
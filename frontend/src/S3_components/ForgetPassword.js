import NavbarHomePage from "./NavbarHomePage";
import Login from "./Login";
import React from "react";
import forget from "./ForgetPassword.module.css"
import closeButton from "../S3_components/closeButton.png"
import { useState } from "react";
import { TextField } from "@mui/material";
import tickIcon from "../S3_components/tickIcon.png"
import axios from "axios"



function ForgetPassword() {
    const [show,isShow]=useState(true)
    const [email,setEmail]=useState("");
    const [showing,isshowing]=useState(false);
    const [showmessage,ismessage]=useState(false);
    const sendMail = async () => {
    console.log(email)
      const res = await axios
        .post("http://localhost:2000/sendMailAll",{email:email})
        .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    const handleChange=()=>{  
      sendMail().then(data=>{
        if(data.msg.localeCompare("no")===0){
          isshowing(false)
          ismessage(true);
        }
        else {
          isshowing(true);
          ismessage(false)

        }
      })
    }
    return(
        <React.Fragment>
        <Login/>
        {show && <div className={forget.shadeareaf}>
                  <div className={forget.modalcontainerf}>
                    <h2>FORGOT PASSWORD?</h2>
                    <p>Don't worry! Enter your Email below and we'll email you with instructions on how to reset your password.</p>
                   <div className={forget.textfield1}>
                    <TextField 
                    type="string"
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                    placeholder={"Enter your Email"}
                    ></TextField></div>
                    {showing &&  <div className={forget.sent}><img src={tickIcon} alt="card__image" width="30"></img>
                    <p> An email has been sent.</p></div> }
                    {showmessage &&  <div className={forget.sent}><img src={tickIcon} alt="card__image" width="30"></img>
                    <p> This Email belongs to no signed up user.</p></div> }
                    </div>
                    
                    
                   
                    <button className={forget.submitbuttonf}
          onClick={handleChange}>Submit</button>
            <div className={forget.closef}>
          <button onClick={()=>isShow(false)}><img src={closeButton} alt="card__image" width="24"></img></button>
          </div>
          
         
                      
        </div>}
        </React.Fragment>
    )
}
export default ForgetPassword
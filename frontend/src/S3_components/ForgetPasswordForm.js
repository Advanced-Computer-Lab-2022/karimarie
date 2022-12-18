import React from 'react'
import inst from "../InstructorHome/InstProfile.module.css"
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logincss from "./Login.module.css"

 const ForgetPasswordForm = () => {
  const id = useParams().id;
const [error, setError] = useState(null)
const sendRequest = async () => {
  const res = await axios
    .post("http://localhost:2000/changepasswordAll", {   
        id:id,
      password:newpassword
    })
    .catch((err) => console.log(err));
  const data = await res.data;
  return data;
};
const [sendmessage,issendmessage]=useState(false)
const [sendmessage2,issendmessage2]=useState(false)
const [newpassword,setnewpassword]=useState('');
const [confirmpassword,setconfirmpassword]=useState('');

const handleSubmit = (e) => {
    console.log(newpassword)
    console.log(confirmpassword)
    if(newpassword!==confirmpassword){
        issendmessage(true);
        issendmessage2(false);
    }else if(newpassword.length<7){
      issendmessage2(true);
      issendmessage(false)
    }
    else {
  e.preventDefault();
  sendRequest()
    .then((data) => console.log(data))
    window.location.href="/login"}
       
};
const [passwordType1, setPasswordType1] = useState("password");
const [passwordType2, setPasswordType2] = useState("password");

const togglePassword2 =()=>{
  if(passwordType2==="password")
  {
   setPasswordType2("text")
   return;
  }
  setPasswordType2("password")
}
const togglePassword1 =()=>{
  if(passwordType1==="password")
  {
   setPasswordType1("text")
   return;
  }
  setPasswordType1("password")
}

    return (
    <div className={inst.mainchange}>
      
            <div className={inst.modalcontainer}>
            <p className={inst.changepass1}>Change Your Password</p>
            <p className={inst.newpass1}>New Password:</p>
            <TextField className={inst.passtextfield1c} type={passwordType1} value={newpassword} autoCapitalize='none' onChange={(e) => setnewpassword(e.target.value)}></TextField>
            <div className={Logincss.change}>
            <div className={Logincss.show2}>
            <button className={Logincss.btnn1} onClick={togglePassword1}>
          { passwordType1==="password"? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
</svg> :<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolo" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg> }
          </button>
          </div>
          </div>
            <p className={inst.confirmpass1}>Confirm Password:</p>
            <TextField type={passwordType2} className={inst.passtextfield2c} value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} ></TextField>
            <div className={Logincss.change2}>
            <div className={Logincss.show2}>
            <button className={Logincss.btnn1} onClick={togglePassword2}>
          { passwordType2==="password"? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
</svg> :<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolo" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg> }
          </button>
          </div>
          </div>
          {sendmessage && <div className={Logincss.message211}><p className={Logincss.message}>Those passwords didn't match. Try Again </p></div>}
            {sendmessage2 && <div className={Logincss.message221}><p>Your password should be at least 8 characters</p></div>}
            <button onClick={handleSubmit} className={inst.submitpassbutton1}>Submit</button>

                </div>
                
    </div>
  )
}
export default ForgetPasswordForm
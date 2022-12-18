import Logincss from "../S3_components/Login.module.css";
import NavbarHomePage from "./NavbarHomePage";
import inst from "../InstructorHome/InstProfile.module.css"
import React from "react";
import { useState } from "react";
import closeIcon from "../S3_components/closeButton.png"
import axios from 'axios';
import { useCookies } from "react-cookie";
import { TextField } from "@mui/material";
import SignUpcss from "./SignUp.module.css";

function Login() {
    const [SignUp,isSignUp]=useState("false");
    const [cookies, setCookie] = useCookies(["jwt"]);
    const [userName,setuserName]=useState('');
    const [password,setpassword]=useState('');
    const [ShowText,isShowText]=useState(false);
    var message=""
   
    const sendUser = async () => {
    const res = await axios
      .post('http://localhost:2000/login', {
        userName : userName,
        password :password
      },{withCredentials: true, credentials: 'include'})
      
      .catch((err) => console.log(err));
      console.log(res.data.msg)
      return res.data;
      
    };
    const [showPass,isShowPass]=useState(false);
    const [datamessage,isdatamessage]=useState('');
    const handleLogin=(e)=>{
        e.preventDefault();
        sendUser().then(data=>{
          console.log(data.msg)
        if(data.msg.localeCompare("no")===0){
          console.log("kkk")
          isShowText(true);
        }else if(data.msg.localeCompare("Instructor")===0) {
          isShowText(false);
          localStorage.setItem("token",data.token)
          window.location.href="/InstructorHomePage"
        }
        else if(data.msg.localeCompare("InstructorfirstTime")===0){
          localStorage.setItem("token",data.token)
          isdatamessage(data.msg);
          isShowPass(true);
        }
        else if(data.msg.localeCompare("Admin")===0) {
          isShowText(false);
          localStorage.setItem("token",data.token)
          window.location.href="/hii"
        }else if(data.msg.localeCompare("CorpTrainee")===0){
          localStorage.setItem("token",data.token)
          localStorage.setItem("userType","CorpTrainee")
          window.location.href=`/Trainee`  
        }
        else if(data.msg.localeCompare("CorpTraineefirstTime")===0){
          localStorage.setItem("token",data.token)
          localStorage.setItem("userType","CorpTrainee")
          isdatamessage(data.msg);
          isShowPass(true);
        }
        
      })

    }
    const [newpassword,setnewpassword]=useState('');
      const [confirmpassword,setconfirmpassword]=useState('');
      const editpassword = async () => {
        const decodeID=String(localStorage.getItem("token"))
        const res = await axios
        .post(`http://localhost:2000/instructor/editpassword/${decodeID}`, {
          password : newpassword
        })
        .catch((err) => console.log(err));
    
      };
      const editpasswordTrainee = async () => {
        const decodeID=String(localStorage.getItem("token"))
        const res = await axios
        .post(`http://localhost:2000/corpTrainee/editpassword/${decodeID}`, {
          password : newpassword
        })
        .catch((err) => console.log(err));
    
      };
     const [sendmessage,issendmessage]=useState(false)
      const [sendmessage2,issendmessage2]=useState(false)
     const changePassword=()=>{
      if(newpassword!==confirmpassword){
          issendmessage(true);
          issendmessage2(false);
      }else if(newpassword.length<7){
        issendmessage2(true);
        issendmessage(false)
      }
      else {
          issendmessage(false)
          issendmessage2(false)
          if(datamessage.localeCompare("InstructorfirstTime")===0){
          editpassword();
          window.location.href="/InstructorHomePage"}
          if(datamessage.localeCompare("CorpTraineefirstTime")===0){
            console.log("ok")
            editpasswordTrainee();
            window.location.href="/Trainee"
          }
      }
      

    }
    const [passwordType, setPasswordType] = useState("password");
    const [passwordType1, setPasswordType1] = useState("password");
    const [passwordType2, setPasswordType2] = useState("password");

    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }
    const togglePassword1 =()=>{
      if(passwordType1==="password")
      {
       setPasswordType1("text")
       return;
      }
      setPasswordType1("password")
    }
    const togglePassword2 =()=>{
      if(passwordType2==="password")
      {
       setPasswordType2("text")
       return;
      }
      setPasswordType2("password")
    }

    console.log(userName)
    console.log(password)
  return (
    <React.Fragment>
   
    <div className={Logincss.containerLogin}>
    <NavbarHomePage isactive="false"></NavbarHomePage>
    {showPass && <div className={Logincss.shadearea22}> 
            <div className={Logincss.modalcontainer12}>
            <p className={Logincss.changepass}>Change Your Password</p>
            <p className={Logincss.newpass}>New Password:</p>
            <TextField className={inst.passtextfield1} type={passwordType1}  required value={newpassword} onChange={(e) => setnewpassword(e.target.value)} ></TextField>
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
            <p className={Logincss.confirmpass}>Confirm Password:</p>
            <TextField className={Logincss.passtextfield21} type={passwordType2} required value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} ></TextField>
            <div className={Logincss.show2}>
            <button className={Logincss.btnn2} onClick={togglePassword2}>
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
          {sendmessage && <div className={Logincss.message2}><p className={Logincss.message}>Those passwords didn't match. Try Again </p></div>}
            {sendmessage2 && <div className={Logincss.message}><p>Your password should be at least 8 characters</p></div>}
            <button className={inst.submitpassbutton} onClick={changePassword}>Submit</button>

                </div>
                </div>}
    <div className={Logincss.first1} id="first">
      <div className={Logincss.behindtext}>
        <div className={Logincss.behindtext1}>
          <h3>Welcome Back</h3>
        </div>
      </div>

      <form className={Logincss.form} id="main">
        <div className={Logincss.textbox}>
          <input type="text" required value={userName} onChange={(e) => setuserName(e.target.value)} />
          <label>UserName</label>
          <span class="material-icons-outlined"> account_circle </span>
          <div className={Logincss.underline} />
        </div>
        
        <div className={Logincss.textbox}>
        <input type={passwordType} required  value={password} onChange={(e) => setpassword(e.target.value)} />
          <label>Password</label>
          <span class="material-icons-outlined"> key </span>
        
          <div className={Logincss.underline} />
        </div>
      </form>
      <div className={Logincss.show2}>
      <button className={Logincss.btnn} onClick={togglePassword}>
          { passwordType==="password"? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
</svg> :<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg> }
          </button>
          </div>
      
      <div>
        <div>
        <button className={Logincss.button12} onClick={handleLogin}>
          <span>Login</span>
        </button>
        </div>
        </div>
        <div>
        <div className={Logincss.hello}>
        <p> <a href="/ForgetPassword">Forgot your password?</a></p>
        </div>
        <div className={Logincss.hrefSign}>
        <p > Don't have an account? <a href="/SignUp"> Signup here </a>
        </p>
        </div>
        </div>
        {ShowText && <div className={Logincss.messagexx}>The username or password you entered is incorrect</div>}
    </div>
    </div>
    </React.Fragment>
  );
}
export default Login;
import Logincss from "../S3_components/Login.module.css";
import NavbarHomePage from "./NavbarHomePage";
import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import { margin } from "@mui/system";
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
      return res.data;
      // message=res.data.msg;
    };
    const handleLogin=(e)=>{
        e.preventDefault();
        sendUser().then(data=>{
        if(data.msg.localeCompare("no")===0){
          isShowText(true);
        }else if(data.msg.localeCompare("Instructor")===0) {
          isShowText(false);
          localStorage.setItem("token",data.token)
          window.location.href="/InstructorHomePage"
        }})

    }
  return (
    <React.Fragment>
    <div className={Logincss.containerLogin}>
    <NavbarHomePage isactive="false"></NavbarHomePage>
    <div className={Logincss.first1} id="first">
      <div className={Logincss.behindtext}>
        <div className={Logincss.behindtext1}>
          <h3>Welcome Back</h3>
        </div>
      </div>

      <form className={Logincss.form} id="main">
        <div className={Logincss.textbox}>
          <input type="text" required  value={userName} onChange={(e) => setuserName(e.target.value)} />
          <label>UserName</label>
          <span class="material-icons-outlined"> account_circle </span>
          <div className={Logincss.underline} />
        </div>
        <div className={Logincss.textbox}>
          <input type="text" required  value={password} onChange={(e) => setpassword(e.target.value)} />
          <label>Password</label>
          <span class="material-icons-outlined"> key </span>
          <div className={Logincss.underline} />
        </div>
      </form>
      
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
        {ShowText && <div className={Logincss.message}>The username or password you entered is incorrect</div>}
    </div>
    </div>
    </React.Fragment>
  );
}
export default Login;
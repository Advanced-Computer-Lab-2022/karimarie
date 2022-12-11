import Logincss from "../S3_components/Login.module.css";
import NavbarHomePage from "./NavbarHomePage";
import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
function Login() {
    const [SignUp,isSignUp]=useState("false");
    const [userName,setuserName]=useState('');
    const [password,setpassword]=useState('');
    const [cookies, setCookie] = useCookies();
    const sendUser = async () => {
    const res = await axios
      .post('http://localhost:2000/login', {
        userName : userName,
        password :password
      },{withCredentials: true, credentials: 'include'})
      .catch((err) => console.log(err));
    };
    const handleLogin=(e)=>{
        e.preventDefault();
        sendUser();
    }
  return (
    <React.Fragment>
    <div className={Logincss.containerLogin}>
    <NavbarHomePage isactive={SignUp}></NavbarHomePage>
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
        <button className={Logincss.button12} onClick={handleLogin}>
          <span>Login</span>
        </button>
        </div>
        <div>
        <div className={Logincss.hello}>
        <p> <a href="#">Forgot your password?</a></p>
        </div>
        <div className={Logincss.hrefSign}>
        <p > Don't have an account? <a href="/SignUp"> Signup here </a>
        </p>
        </div>
        </div>
    </div>
    </div>
    </React.Fragment>
  );
}
export default Login;
import Logincss from "../S3_components/Login.module.css";
import NavbarHomePage from "./NavbarHomePage";
import React from "react";
function Login() {
  return (
    <React.Fragment>
    <NavbarHomePage></NavbarHomePage>
    <div className={Logincss.first1} id="first">
      <div className={Logincss.behindtext}>
        <div className={Logincss.behindtext1}>
          <h3>Welcome Back</h3>
        </div>
      </div>

      <form className={Logincss.form} id="main">
        <div class={Logincss.textbox}>
          <input type="text" required />
          <label>UserName</label>
          <span class="material-icons-outlined"> account_circle </span>
          <div className={Logincss.underline} />
        </div>
        <div class={Logincss.textbox}>
          <input type="text" required />
          <label>Password</label>
          <span class="material-icons-outlined"> key </span>
          <div className={Logincss.underline} />
        </div>

        <button class={Logincss.button1}>
          <span>Login</span>
        </button>

        <p>
          <a href="#">Forgot your password?</a>
        </p>

        <p1>
          Don't have an account?
          <a href="/SignUp"> Signup here </a>
        </p1>
      </form>
    </div>

    </React.Fragment>
  );
}
export default Login;
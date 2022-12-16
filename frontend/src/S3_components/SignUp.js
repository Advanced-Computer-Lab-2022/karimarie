import SignUpcss from "../S3_components/SignUp.module.css";
import NavbarHomePage from "./NavbarHomePage";
import React from "react";
import { useState } from "react";
import "material-icons/iconfont/material-icons.css"
//lama tigy te3mely backend hewar el label hayezbot be handle change
function SignUp() {
    const [SignUp,isSignUp]=useState("true")
  return (
    <React.Fragment>
        <NavbarHomePage
        isactive={SignUp}></NavbarHomePage>
   
    <div className={SignUpcss.first1} id="first">
      <div className={SignUpcss.behindtext}>
        <div className={SignUpcss.behindtext1}>
          <h3>Create Your Account</h3>
        </div>
      </div>

      <form name="myForm" method="post" action="" className={SignUpcss.form}>
        <div class={SignUpcss.textbox}>
          <input type="text" name="firstname" required />
          <label>First Name</label>
          <span class="material-icons-outlined"> account_circle </span>
          <div className={SignUpcss.underline} />
        </div>
        <div class={SignUpcss.textbox}>
          <input type="text" name="lastname" required />
          <label>Last Name</label>
          <span class="material-icons-outlined"> account_circle </span>
          <div className={SignUpcss.underline} />
        </div>

        <div class={SignUpcss.textbox}>
          <input type="email" name="email" required />
          <label>Email</label>
          <span class="material-icons-outlined"> mail </span>
          <div className={SignUpcss.underline} />
        </div>
        <div class={SignUpcss.textbox}>
          <input type="text" name="username" required />
          <label>UserName</label>
          <span class="material-icons-outlined"> account_circle </span>
          <div className={SignUpcss.underline} />
        </div>
        <div class={SignUpcss.textbox}>
          <input type="password" name="password" required />
          <label>Password</label>
          <span class="material-icons-outlined"> key </span>
          <div className={SignUpcss.underline} />
        </div>
        <div class={SignUpcss.textbox}></div>
        <div class={SignUpcss.gender}>
          <span class="material-icons-outlined"> perm_identity </span>
          <label>Gender</label>
        </div>
        <form class={SignUpcss.formflex}>
          <div class={SignUpcss.formrow}>
            <input
              type="radio"
              name="gender"
              id="Male"
              class={SignUpcss.forminput}
              required
            />
            <label for="Male" class={SignUpcss.formlabel}>
              Male
            </label>
          </div>
          <div class={SignUpcss.formrow}>
            <input
              type="radio"
              name="gender"
              id="Female"
              class={SignUpcss.forminput}
              required
            />
            <label for="Female" class={SignUpcss.formlabel}>
              Female
            </label>
          </div>
        </form>

        <div>
          <label class={SignUpcss.switch1}>
            <input type="checkbox" required />
            <span class={SignUpcss.slider}></span>
          </label>
          <text class={SignUpcss.textp}>
            I accept the
            <a href="#"> terms and conditions </a>
          </text>
        </div>

        <button class={SignUpcss.button1} onclick="SignUp()">
          <span>Join Now </span>
        </button>

        <p>
          Already have an account?
          <a href="#"> Login here</a>
        </p>
      </form>
    </div>
 
    </React.Fragment>
  );
}
export default SignUp;
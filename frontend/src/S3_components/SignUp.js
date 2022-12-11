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

      <form method="post" action="" className={SignUpcss.form} id="main">
        <div class={SignUpcss.textbox}>
          <input type="text" required />
          <label>First Name</label>
          <span class="material-icons-outlined"> account_circle </span>
          <div className={SignUpcss.underline} />
        </div>
        <div class={SignUpcss.textbox}>
          <input type="text" required />
          <label>Last Name</label>
          <span class="material-icons-outlined"> account_circle </span>
          <div className={SignUpcss.underline} />
        </div>

        <div class={SignUpcss.textbox}>
          <input type="text" required />
          <label>Email</label>
          <span class="material-icons-outlined"> mail </span>
          <div className={SignUpcss.underline} />
        </div>
        <div class={SignUpcss.textbox}>
          <input type="text" required />
          <label>UserName</label>
          <span class="material-icons-outlined"> account_circle </span>
          <div className={SignUpcss.underline} />
        </div>
        <div class={SignUpcss.textbox}>
          <input type="text" required />
          <label>Password</label>
          <span class="material-icons-outlined"> key </span>
          <div className={SignUpcss.underline} />
        </div>

        <div class={SignUpcss.gender}>
          <span class="material-icons-outlined"> perm_identity </span>
          <label>Gender</label>
        </div>

        <div class={SignUpcss.item}>
          <div class={SignUpcss.checkboxrect}>
            <input type="checkbox" id="checkbox-rect" name="check" />
            <label for="checkbox-rect">Male</label>
          </div>
          <div class={SignUpcss.checkboxrect1}>
            <input type="checkbox" id="checkbox-rect1" name="check" />
            <label for="checkbox-rect1">Female</label>
          </div>
        </div>

        <div>
          <label class={SignUpcss.switch1}>
            <input type="checkbox" />
            <span class={SignUpcss.slider}></span>
          </label>
          <text class={SignUpcss.textp}>
            Send me special offers, personalized recommendations.
          </text>
        </div>

        <button class={SignUpcss.button1}>
          <span>Join Now </span>
        </button>

        <p>
          Already have an account?
          <a href="/login"> Login here</a>
        </p>
      </form>
    </div>
    </React.Fragment>
  );
}
export default SignUp;
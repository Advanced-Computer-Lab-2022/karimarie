import SignUpcss from "../S3_components/SignUp.module.css";
import NavbarHomePage from "./NavbarHomePage";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Logincss from "./Login.module.css"
//lama tigy te3mely backend hewar el label hayezbot be handle change
function SignUp() {
  const [SignUp, isSignUp] = useState("true");
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setGender] = useState("");
  const [ShowText, isShowText] = useState(false);
  const [ShowText1, isShowText1] = useState(false);
  const [ShowText2, isShowText2] = useState(false);
  const [ShowText3, isShowText3] = useState(false);
  const sendUser = async () => {
    const res = await axios
      .post(
        "http://localhost:2000/signup",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          userName: userName,
          password: password,
          gender: gender,
        },
        { withCredentials: true, credentials: "include" }
      )

      .catch((err) => console.log(err));
    console.log(res.data.msg);
    return res.data;
  };

  const handleSignUp = (e) => {
    if (document.getElementById("male").checked) {
      setGender("male");
    } else if (document.getElementById("female").checked) {
      setGender("female");
    } else {
      setGender("");
    }
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      userName === "" ||
      password === "" ||
      gender === ""
    ) {
      isShowText3(true);
      isShowText(false);
      isShowText1(false);
      isShowText2(false);
    } else {
      sendUser().then((data) => {
        if (data.msg.localeCompare("Email entered is already taken") === 0) {
          isShowText(true);
          isShowText1(false);
          isShowText2(false);
          isShowText3(false);
        } else if (
          data.msg.localeCompare(
            "Password must be greater than 5 characters and less than 25 characters"
          ) === 0
        ) {
          isShowText1(true);
          isShowText(false);
          isShowText2(false);
          isShowText3(false);
        } else if (data.msg.localeCompare("Username already taken!") === 0) {
          isShowText2(true);
          isShowText(false);
          isShowText1(false);
          isShowText3(false);
        } else if (data.msg.localeCompare("Individual Trainee") === 0) {
          isShowText(false);
          isShowText1(false);
          isShowText2(false);
          isShowText3(false);

          localStorage.setItem("token", data.token);
          localStorage.setItem("userType","Trainee")
          window.location.href = "/Terms&Conditions";
        }
      });
    }
  };
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  return (
    <React.Fragment>
      <div className={SignUpcss.containerSignUp}>
      <NavbarHomePage
        isactive={SignUp}></NavbarHomePage>
        <div className={SignUpcss.first1} id="first">
          <div className={SignUpcss.behindtext}>
            <div className={SignUpcss.behindtext1}>
              <h3>Create Your Account</h3>
            </div>
          </div>

          <form
            name="myForm"
            method="post"
            action=""
            className={SignUpcss.form}
            onSubmit={handleSignUp}
          >
            <div class={SignUpcss.textbox}>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                name="firstname"
                required
              />
              <label>First Name</label>
              <span class="material-icons-outlined"> account_circle </span>
              <div className={SignUpcss.underline} />
            </div>
            <div class={SignUpcss.textbox}>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="lastname"
                required
              />
              <label>Last Name</label>
              <span class="material-icons-outlined"> account_circle </span>
              <div className={SignUpcss.underline} />
            </div>

            <div class={SignUpcss.textbox}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                
              />
              <label>Email</label>
              <span class="material-icons-outlined"> mail </span>
              <div className={SignUpcss.underline} />
            </div>
            <div class={SignUpcss.textbox}>
              <input
                type="text"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                name="username"
                required
              />
              <label>UserName</label>
              <span class="material-icons-outlined"> account_circle </span>
              <div className={SignUpcss.underline} />
            </div>
            <div class={SignUpcss.textbox}>
              <input
                type={passwordType}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                name="password"
                required
              />
              <label>Password</label>
              <span class="material-icons-outlined"> key </span>
              <div className={Logincss.show2}>
      <button className={Logincss.btnn} type="button" onClick={togglePassword}>
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
              <div className={SignUpcss.underline} />
            </div>
            <div class={SignUpcss.textbox}></div>
            <div class={SignUpcss.gender}>
              <span class="material-icons-outlined"> perm_identity </span>
              <label>Gender</label>
            </div>
            <div class={SignUpcss.genderbox}>
              <label class={SignUpcss.radlabel}>
                <input
                  type="radio"
                  value="male"
                  id="male"
                  onChange={(e) => setGender("male")}
                  class={SignUpcss.radinput}
                  name="rad"
                  required
                />
                <div class={SignUpcss.raddesign}></div>
                <div class={SignUpcss.radtext}>Male</div>
              </label>

              <label class={SignUpcss.radlabel}>
                <input
                  type="radio"
                  value="female"
                  id="female"
                  onChange={(e) => setGender("female")}
                  class={SignUpcss.radinput}
                  name="rad"
                  required
                />
                <div class={SignUpcss.raddesign}></div>
                <div class={SignUpcss.radtext}>Female</div>
              </label>
            </div>

            <button class={SignUpcss.button1} type="submit" onClick={handleSignUp}>
              <span>Join Now </span>
            </button>
            <p>
              Already have an account?
              <a href="/login"> Login here</a>
            </p>
            {ShowText && (
              <div class={SignUpcss.message1}>
                The entered email is already in use
              </div>
            )}
            {ShowText1 && (
              <div class={SignUpcss.message2}>
                Password must be greater than 5 characters and less than 25
                characters
              </div>
            )}
            {ShowText2 && (
              <div class={SignUpcss.message3}>
                The username you have picked is already in use
              </div>
            )}
            {/* {ShowText3 && (
              <div class={SignUpcss.message4}>
                Please fill the missing fields{" "}
              </div>
            )} */}
          </form>
        </div>
      </div>
      ;
    </React.Fragment>
  );
}
export default SignUp;
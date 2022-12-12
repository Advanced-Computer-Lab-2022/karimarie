import React from 'react'
import inst from "./InstProfile.module.css"
import InstructorNavBar from './InstructorNavBar'
import { Rating } from '@mui/material'
// import editIcon from "./icons8-edit-24.png"
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import closeIcon from "../S3_components/closeButton.png"
const InstProfile = () => {
    const[Edit,isShowEdit]=useState(false);
    const[Password,isShowPassword]=useState(false);

    const showEdit=(e)=>{
       isShowEdit(true);
    }
    const showPassword=(e)=>{
        isShowPassword(true);
     }
     const hideEdit=(e)=>{
        isShowEdit(false);
     }
     const hidePass=(e)=>{
        isShowPassword(false);
     }

    return (
        <div>
            <InstructorNavBar></InstructorNavBar>
            <div className={inst.all}>
            <p className={inst.firsttitle}>INSTRUCTOR</p>
            <p className={inst.name}>Avinash Jain</p>
            <p className={inst.shortdescription}>CEO of TheCodex.me - Teaching 500,000+ Students how to code</p>
            <p className={inst.totalstudents}>Total Students</p>
            <p className={inst.totalstudentsnumber}>1,200</p>
            <p className={inst.totalreviews}>Total Reviews</p>
            <p className={inst.totalreviewsnumber}>370</p>
            <p className={inst.averagerating}>Average Rating</p>
            <p className={inst.averageratingnumber}>4.7</p>
            <p className={inst.aboutme}>About Me</p>
            <p className={inst.aboutmetext}>Avinash Jain is currently a senior at UC Berkeley majoring in Electrical Engineering and Computer Science. He's the CEO and Founder of TheCodex, an online educational platform focused on bringing the best programming content to hundreds of thousands of students around the world.
His programming journey began at the age of 10, starting off with simple Python scripts to crawl the weather. Since then, he's worked at numerous companies and is professionally experienced in Python, iOS Development and Web Development. He's launched a plethora of applications in the App Store amassing thousands of downloads.</p>
          <button className={inst.editbutton}onClick={showEdit}>
            {/* <img src={editIcon} className={inst.editicon}></img> */}
          </button>
            <img src="https://source.unsplash.com/600x400/?food" alt="card__image" className={inst.image} width="600"/>    
            <button className={inst.changepassword} onClick={showPassword}>Change Password</button>

            {Edit&& <div className={inst.shadearea}> 
            <div className={inst.modalcontainer}>
                <p className={inst.editbiotext}>Edit Your Bio</p>
                <textarea className={inst.edittextfield}>
                </textarea>
                <button className={inst.submiteditbutton}>Submit</button>
                <button onClick={hideEdit} className={inst.closeedit}  ><img src={closeIcon} ></img></button>
            </div>
            </div>
            }
            {Password && <div className={inst.shadearea}> 
            <div className={inst.modalcontainer}>
            <p className={inst.changepass}>Change Your Password</p>
            <p className={inst.newpass}>New Password:</p>
            <TextField className={inst.passtextfield1}></TextField>
            <p className={inst.confirmpass}>Confirm Password:</p>
            <TextField className={inst.passtextfield2}></TextField>
            <button className={inst.submitpassbutton}>Submit</button>
            <button onClick={hidePass} className={inst.closeedit} ><img src={closeIcon} ></img></button>

                </div>
                </div>
                }
                </div>
        </div>

    )
}

export default InstProfile
import React from 'react'
import inst from "./InstProfile.module.css"
import InstructorNavBar from './InstructorNavBar'
import { Rating } from '@mui/material'
import editIcon from "./editIcon.png"
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import closeIcon from "../S3_components/closeButton.png"

import axios from "axios"
const InstProfile = () => {
    const[Edit,isShowEdit]=useState(false);
    const[Password,isShowPassword]=useState(false);
    const[Email,isShowEmail]=useState(false);

    const showEdit=(e)=>{
        console.log("hi")
       isShowEdit(true);
    }
    const showEmail=(e)=>{
        isShowEmail(true);
     }
     const showRatings=(e)=>{
        isShowEmail(true);
     }
    const showPassword=(e)=>{
        isShowPassword(true);
     }
     const hideEdit=(e)=>{
        isShowEdit(false);
        isShowEmail(false);
     }
     const hidePass=(e)=>{
        isShowPassword(false);
     }
     const [editBio,setEditBio]=useState('');
     const [editEmail,setEditEmail]=useState('');
         const editBiograpgy = async () => {
         const decodeID=String(localStorage.getItem("token"))
         const res = await axios
         .post(`http://localhost:2000/instructor/editbio/${decodeID}`, {
           biography : editBio
         })
         .catch((err) => console.log(err));
     
       };
 
       const editMyEmail = async () => {
         const res = await axios
         .post(`http://localhost:2000/instructor/editemail/${localStorage.getItem("token")}`, {
           email : editEmail
         })
         .catch((err) => console.log(err));
     
       };
       const changeBio=(e)=>{
        editBiograpgy();
        isShowEdit(false);
        setEditBio('')
        window.location.href="/profile"
        e.preventDefault();
     }
      const changeEmail= ()=>{
         console.log(editEmail)
         editMyEmail()
         setEditEmail('')
         isShowEmail(false)
        
      }
    const [Instructor,setInstructor]=useState("");
    const [rating,setRating]=useState("");
    const getInstructor = async () => {
        if(localStorage.getItem("token")!==''){
        const res = await axios
          .get(`http://localhost:2000/instructor/getByid/${localStorage.getItem("token")}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      }};
      useEffect(() => {
        getInstructor().then((data) => {setInstructor(data.inst)
            console.log(data.inst.rating)
            if(data.inst.rating===undefined){
                setRating(0)
              }else{
                setRating(Math.ceil(data.inst.rating*100)/100)
              }
        });
      }, []);
    const [coursesInst, setCourses] = useState([]);
    const [courselength,setCourselength]=useState(0);
    const getCourses = async () => {
        const res = await axios
          .get(`http://localhost:2000/instructor/instCourses/${localStorage.getItem("token")}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
      useEffect(() => {
        getCourses().then((data) => {setCourses(data)
        if(data.length!==0){
            setCourselength(data.length)
        }});
      }, []);
    return (
        <div className={inst.allall}>
            <InstructorNavBar></InstructorNavBar>
            <div className={inst.all}>
            <p className={inst.firsttitle}>INSTRUCTOR</p>
            <p className={inst.name}>{Instructor.userName}</p>
            <p className={inst.shortdescription}>CEO of TheCodex.me - Teaching 500,000+ Students how to code</p>
            <p className={inst.totalstudents}>Total Students</p>
            <p className={inst.totalstudentsnumber}>1,200</p>
            <p className={inst.totalreviews}>Total Reviews</p>
            <p className={inst.totalreviewsnumber}>370</p>
            <p className={inst.averagerating}>Average Rating</p>
            {Instructor && <p className={inst.averageratingnumber}>{rating}</p>}
            <p className={inst.aboutme}>About Me</p>
            <p className={inst.aboutmetext}>{Instructor.biography}</p>
          <button className={inst.editbutton}onClick={showEdit}>
            <img src={editIcon} className={inst.editicon} width="24"></img>
          </button>

          <div className={inst.ViewCourses2}>
            <div className={inst.wrap}>
            <div className={inst.searchC}>
                <input type="text" className={inst.searchTerm} placeholder="What are you looking for?"/>
                <button type="submit" class={inst.searchButtonC}>
                    <i class="fa fa-search"></i>
                </button>
            </div>
            </div>
            <p>My Courses ({courselength})</p>
            {coursesInst && coursesInst.map((course)=><div className={inst.ViewCourses}>
             <img src="https://source.unsplash.com/600x400/?food" alt="card__image" className={inst.courseimg} width="140"/> 
             <div><h2>{course.title}</h2> 
             </div>
             <div><i className={["material-icons-outlined"].join(' ')} >account_circle</i>{" "}<p>{Instructor.userName}</p></div>
             <div className={inst.rat}><Rating name="read-only"  defaultValue={course.rating} precision={0.5} className={inst.starimage1} width="16" readOnly />
             <p>{course.rating}</p></div>
              </div>
           )}
        </div>
            <img src="https://source.unsplash.com/600x400/?food" alt="card__image" className={inst.image} width="600"/>    
            <button className={inst.changepassword} onClick={showPassword}>Change Password</button>
            <button className={inst.changeEmail} onClick={showEmail}>Change My Email</button>
            <button className={inst.ViewRatings} onClick={()=>window.location.href="/ViewMyRatings"}>View My Ratings</button>
            {Edit&& <div className={inst.shadearea}> 
            <div className={inst.modalcontainer}>
                <p className={inst.editbiotext}>Edit Your Bio</p>
                <textarea className={inst.edittextfield} value={editBio} onChange={(e) => setEditBio(e.target.value)}>
                </textarea>
                <button className={inst.submiteditbutton} onClick={changeBio}>Submit</button>
                <button onClick={hideEdit} className={inst.closeedit}  ><img src={closeIcon} ></img></button>
            </div>
            </div>
            }
            {Email&& <div className={inst.shadearea}> 
            <div className={inst.modalcontainer}>
                <p className={inst.editemailtext}>Edit Your Email</p>
                <form onSubmit={changeEmail}>
                <TextField   required type="email" className={inst.editemailfield} value={editEmail} placeholder={"Type Your Email"} onChange={(e) => setEditEmail(e.target.value)}>
                </TextField>
                <button className={inst.submiteditbutton}  type="submit" >Submit</button>
                </form>
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
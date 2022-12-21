import React from "react"
import InstSideBar from "./InstSideBar"
import InstructorNavBar from "./InstructorNavBar"
import HomePage from "../S3_components/HomePage"
import l from "../InstructorHome/InstSideBar.module.css"
import Slider from "react-slick";
import h from "../S3_components/HomePage.module.css"
import CourseCard from '../S3_components/CourseCard';
import arrowIcon from "../S3_components/arrowIcon.png"
import axios from "axios"
import error from "../InstructorHome/error.png"
import { useEffect,useState } from "react";
const InstructorHomePage=()=>{
    const [access,hasaccess]=useState(false)
    const [datas,setdata]=useState("")
    const grantAccess = async () => {
        console.log(localStorage.getItem("token"))
        if(localStorage.getItem("token")===""){
            console.log("hi")
            hasaccess(false)
        }else {
        const res = await axios
          .get(`http://localhost:2000/requireAuth/${localStorage.getItem("token")}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;}
      };
      useEffect(() => {
        if(localStorage.getItem("token")!==""){
            grantAccess().then((data)=>{setdata(data.message)
            if(data.message==="Inst"){
                hasaccess(true)
            }
            else {
                hasaccess(false)
            }
        });
      }}, []);
    return(
        <React.Fragment>
        {access && <div><InstructorNavBar/>
        <div className={l.low}>
        <InstSideBar/></div></div>}
        {!access && <div>
            <img src={error} width="64"></img> Access not granted
            </div>}
        </React.Fragment>
    )

}
export default InstructorHomePage
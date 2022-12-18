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
import { useEffect,useState } from "react";

const InstructorHomePage=()=>{
   
    
    return(
        <React.Fragment>
        <InstructorNavBar/>
        <div className={l.low}>
        <InstSideBar/></div>
       
        </React.Fragment>
    )

}
export default InstructorHomePage
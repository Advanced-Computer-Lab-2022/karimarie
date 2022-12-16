import React from "react"
import InstSideBar from "./InstSideBar"
import InstructorNavBar from "./InstructorNavBar"
import HomePage from "../S3_components/HomePage"
import Subjects from '../S3_components/Subjects';
import l from "../InstructorHome/InstSideBar.module.css"



const InstructorHomePage=()=>{
    
    return(
        <React.Fragment>
        <InstructorNavBar/>
        <InstSideBar/>
        <div className={l.subj}>
        <Subjects></Subjects></div>
        </React.Fragment>
    )

}
export default InstructorHomePage
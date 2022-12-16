import React from 'react'

import { useEffect, useState } from "react";
import l from "../InstructorHome/InstSideBar.module.css"
import CourseCard from '../S3_components/CourseCard';
import axios from "axios"
import CreateCourseNew from './CreateCourseNew';
const InstSideBar = () => {
    const [choose,setChoose]=useState('');
   const [showCreate,isShowCreate]=useState(false)
    const handleClick = (e) => {
        if(choose==="CreateCourse"){
            console.log("okkkk")
           isShowCreate(true);

        }   
    
      };

    return (
        <div>
  <body className={l.bodyy}>
    <div className={l.wrapper} style={{display:"inline"}}>
    <div className={l.sidebar}>
        
        <ul>
            <li className={l.listI}><button onClick={() => {setChoose('CreateCourse');handleClick(); }} 
            className={l.anc}><i class="fas fa-user" style={{color:"white"}}></i><p className={l.text}>Create Course</p></button></li>
            <li className={l.listI}><button className={l.anc} onClick={()=>setChoose("creq")}><i className={["fas fa-address-card", l.iconn].join(' ')} style={{color:"white"}}></i><p className={l.text}>Course Requests</p></button></li>
            <li className={l.listI}><button className={l.anc} onClick={()=>setChoose("viewReports")}><i className={["fas fa-project-diagram", l.iconn].join(' ')} style={{color:"white"}}></i><p className={l.text}>View Reports</p></button></li>
            <li className={l.listI}><button className={l.anc}><i class="fas fa-blog" style={{color:"white"}}></i><p className={l.text}>Blogs</p></button></li>
            <li className={l.listI}><button className={l.anc}><i class="fas fa-address-book" style={{color:"white"}}></i><p className={l.text}>Contact</p></button></li>
            <li className={l.listI}><button className={l.anc}><i class="fas fa-map-pin" style={{color:"white"}}></i><p className={l.text}>Map</p></button></li>
        </ul> 
    </div>
    {showCreate && <CreateCourseNew/>}

</div>
</body>


        </div>
    
    )
}

export default InstSideBar
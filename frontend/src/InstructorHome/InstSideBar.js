import React from 'react'

import { useEffect, useState } from "react";
import l from "../InstructorHome/InstSideBar.module.css"
import CourseCard from '../S3_components/CourseCard';
import axios from "axios"
const InstSideBar = () => {
    const [choose,setChoose]=useState('');
    const [courses, setCourses] = useState([]);
    const[showCourse,setshowCourse]=useState(false)
    const handleClick = (e) => {
        const getMyCourses = async () => {
            const token=localStorage.getItem("token");
            const res = await axios
              .get(`http://localhost:2000/instructor/instCourses/${token}`)
              .catch((err) => console.log(err));
              const data = await res.data;
              console.log(data)
              return data;
          };
        if(choose==="ViewCourses"){
            getMyCourses().then((data) =>{ setCourses(data)
            setshowCourse(true)
            });

        }   
    
      };

    return (
        <div>
  <body className={l.bodyy}>
    <div className={l.wrapper} style={{display:"inline"}}>
    <div className={l.sidebar}>
        
        <ul>
            <li className={l.listI}><button onClick={() => {setChoose('ViewCourses');handleClick(); }} 
            className={l.anc}><i class="fas fa-user" style={{color:"white"}}></i><p className={l.text}>View My Courses</p></button></li>
            <li className={l.listI}><button className={l.anc} onClick={()=>setChoose("creq")}><i className={["fas fa-address-card", l.iconn].join(' ')} style={{color:"white"}}></i><p className={l.text}>Course Requests</p></button></li>
            <li className={l.listI}><button className={l.anc} onClick={()=>setChoose("viewReports")}><i className={["fas fa-project-diagram", l.iconn].join(' ')} style={{color:"white"}}></i><p className={l.text}>View Reports</p></button></li>
            <li className={l.listI}><button className={l.anc}><i class="fas fa-blog" style={{color:"white"}}></i><p className={l.text}>Blogs</p></button></li>
            <li className={l.listI}><button className={l.anc}><i class="fas fa-address-book" style={{color:"white"}}></i><p className={l.text}>Contact</p></button></li>
            <li className={l.listI}><button className={l.anc}><i class="fas fa-map-pin" style={{color:"white"}}></i><p className={l.text}>Map</p></button></li>
        </ul> 
    </div>
</div>
{showCourse && courses.map((courses)=>(<CourseCard
         id={courses._id}
         title={courses.title}
         totalHours={courses.totalHours}
         rating={courses.rating}
         price={courses.price}
         currency={courses.currency}
         subject={courses.subject}
         description={courses.description}
         type="Instructor"
        />))}
</body>


        </div>
    
    )
}

export default InstSideBar
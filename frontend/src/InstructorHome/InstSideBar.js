import React from 'react'

import { useEffect, useState } from "react";
import l from "../InstructorHome/InstSideBar.module.css"
import CourseCard from '../S3_components/CourseCard';
import axios from "axios"
import Subjects from '../S3_components/Subjects';
import Slider from "react-slick";
import h from "../S3_components/HomePage.module.css"
import arrowIcon from "../S3_components/arrowIcon.png"
import CreateCourseNew from './CreateCourseNew';
const InstSideBar = () => {
    const [choose,setChoose]=useState("home");
   const [showCreate,isShowCreate]=useState(false)
   const[courses,setCourses]= useState('');
   const [topRated,setTopRated]=useState('');
   var settings = {
     dots: true,
     infinite: false,
     speed: 800,
     slidesToShow: 5,
     slidesToScroll: 2
   };
   const [mostPop,setMostPop]=useState('');
   const getCourses = async () => {
     const res = await axios
       .get("http://localhost:2000/home")
       .catch((err) => console.log(err));
       const data = await res.data;
       return data;
   };
   useEffect(() => {
     getCourses().then((data) => { setCourses(data.priceList)
       setTopRated((data.priceList).sort((a,b)=>b.rating-a.rating).slice(0,10))
       setMostPop((data.priceList).sort((a,b)=>b.numStudents-a.numStudents).slice(0,10));
 
     });    
   }, []);
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
    {choose==="CreateCourse" && <CreateCourseNew/>}
    {choose==="home" &&
    <div> 
    <div className={l.subj}>
        <Subjects></Subjects></div>
        <div>
          <h6 className={l.mostpopular1}>Most Popular</h6>
          <img src={arrowIcon} className={l.arrow1}></img>
      </div>
      <div className={l.movee}>
        <div className={h.container}>
        <Slider {...settings} >
        {mostPop && mostPop.map((courses)=>(<CourseCard
         id={courses._id}
         title={courses.title}
         totalHours={courses.totalHours}
         rating={courses.rating}
         price={courses.originalPrice}
         priceafter={courses.price}
         currency={courses.currency}
         subject={courses.subject}
         description={courses.description}
         type="Guest"
         type2="Instructor"
        />))}
         </Slider>
        </div>
        </div>
        <div>
          <h6 className={l.toppopular1}>Top Rated</h6>
          <img src={arrowIcon} className={l.arrow12}></img>
      </div>
      <div className={h.container2}>
        <Slider {...settings} >
        {topRated && topRated.map((courses)=>(<CourseCard
         id={courses._id}
         title={courses.title}
         totalHours={courses.totalHours}
         rating={courses.rating}
         price={courses.originalPrice}
         priceafter={courses.price}
         currency={courses.currency}
         subject={courses.subject}
         description={courses.description}
         type="Guest"
         type2="Instructor"
        />))}
         </Slider>
        </div>
        </div>}

</div>
</body>


        </div>
    
    )
}

export default InstSideBar
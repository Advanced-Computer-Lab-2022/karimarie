import React, { useMemo } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from './CourseCard';
import h from "../S3_components/HomePage.module.css"
import { Carousel } from 'react-responsive-carousel';
import NavbarHomePage from './NavbarHomePage';
import { Navigate, useParams } from "react-router-dom";
import CourseDetails from '../pages/CourseDetails';
import f from "../S3_components/FilterSearchPage.module.css"
import InstructorNavBar from '../InstructorHome/InstructorNavBar';
const FilterSearchPage=()=>{
    const params = new URLSearchParams(window.location.search);
    const x = params.get('courses');
    const type=params.get('type')
    const [courses,setCourses]=useState(JSON.parse(x));
    const handleClearNavigate=()=>{
      if(type==="Instructor"){
        window.location.href='/InstructorHomePage'
      }
      if(type==="Admin"){
        window.location.href='/hii'
      }
      if(type==="Guest"){
        window.location.href='/'
      }
    }
  return(
    <React.Fragment>
        <div>
       {type==="Guest" && <NavbarHomePage></NavbarHomePage>}
       {type==="Instructor" && <InstructorNavBar/>}
       {/* {type==="Admin" && <NavbarHomePage/>} */}
          <button className={f.button79} onClick={handleClearNavigate}>Clear Filter</button>
         <div class={f.container}>

        {courses.length!==0 && courses.map((courses)=>(<CourseCard
         id={courses._id}
         title={courses.title}
         totalHours={courses.totalHours}
         rating={courses.rating}
         price={courses.price}
         currency={courses.currency}
         subject={courses.subject}
         description={courses.description}
         type="Guest"
        />))}

        {courses.length===0 && <div className={f.sorry}>
            <h1> We're Sorry!</h1>
            <p>We can't seem to find any courses that matches your filter</p>
            </div>}
        </div>
        </div>


    </React.Fragment>
  )
}
export default FilterSearchPage;
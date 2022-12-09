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
const FilterSearchPage=()=>{
    const params = new URLSearchParams(window.location.search);
    const x = params.get('courses');
    const [courses,setCourses]=useState(JSON.parse(x));
  return(
    <React.Fragment>
        <div>
        <NavbarHomePage></NavbarHomePage>
          <button className={f.button79} onClick={()=>{window.location.href=`/ `
}}>Clear Filter</button>
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
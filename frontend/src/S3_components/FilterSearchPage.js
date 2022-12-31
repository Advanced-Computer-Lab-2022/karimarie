import React, { useMemo } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from './CourseCard';
import h from "../S3_components/HomePage.module.css"
import { Carousel } from 'react-responsive-carousel';
import NavbarHomePage from './NavbarHomePage';
import { Navigate, useParams } from "react-router-dom";
import f from "../S3_components/FilterSearchPage.module.css"
import InstructorNavBar from '../InstructorHome/InstructorNavBar';
import TraineeNavbar from '../TraineeHome/TraineeNavbar';
import NavbarAdminPage from '../pages/Admin/S3_components/NavbarAdminPage';
import error from "../InstructorHome/error.png"

const FilterSearchPage=()=>{
    const params = new URLSearchParams(window.location.search);
    const x = localStorage.getItem("filter");
    const type=params.get('type')
    const spec=localStorage.getItem("userType")
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
      if(type==="Trainee"){
        window.location.href=`/Trainee`
      }
    }
    const [access,hasaccess]=useState(false)
    console.log(type)
    useEffect(() => {
      if(type==null){
        hasaccess(false)
      }
      else {
        hasaccess(true)
      }
    }, []);
    
  return(
    <React.Fragment>
       {access &&  <div>
       {type==="Guest" && <NavbarHomePage></NavbarHomePage>}
       {type==="Instructor" && <InstructorNavBar/>}
       {type==="Trainee" && <TraineeNavbar/>}
       {type==="Admin" && <NavbarAdminPage/>}
       {/* {type==="Admin" && <NavbarHomePage/>} */}
          <button className={f.button79} onClick={handleClearNavigate}>Clear Filter</button>
         <div class={f.container}>

        {spec!=="CorpTrainee" && courses.length!==0 && courses.map((courses)=>(<CourseCard
         id={courses._id}
         title={courses.title}
         totalHours={courses.totalHours}
         rating={courses.rating}
         price={courses.originalPrice}
         priceafter={courses.price}
         currency={courses.currency}
         subject={courses.subject}
         description={courses.description}
         startTime={courses.startTime}
         expirationTime={courses.expirationTime}
         discount={courses.discount}
         discountapplied={courses.discountapplied}
         type="Guest"
         type2={type}
        />))}

        {courses.length===0 && <div className={f.sorry}>
            <h1> We're Sorry!</h1>
            <p>We can't seem to find any courses that matches your filter</p>
            </div>}

            {spec==="CorpTrainee" && courses.length!==0 && courses.map((courses)=>(<CourseCard
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
         type2="CorpTrainee"
        />))}

       
        </div>
        </div>}
        {!access && <div>
            <img src={error} width="64"></img> Access not granted
            </div>}


    </React.Fragment>
  )
}
export default FilterSearchPage;
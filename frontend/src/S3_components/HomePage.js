import React, { useMemo } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from './CourseCard';
import h from "../S3_components/HomePage.module.css"
import { Carousel } from 'react-responsive-carousel';
import NavbarHomePage from './NavbarHomePage';
import Banner from './Banner';
import Subjects from './Subjects';
const HomePage=()=>{
const [courses, setCourses] = useState([]);

const getCourses = async () => {
    const res = await axios
      .get("http://localhost:2000/home")
      .catch((err) => console.log(err));
      const data = await res.data;
      return data;
  };
  useEffect(() => {
    getCourses().then((data) => setCourses(data.courses));    
  }, []);

  return(
    <React.Fragment>
        <div>
        <NavbarHomePage></NavbarHomePage>
        <Banner></Banner>
        <Subjects></Subjects>
         <div class={h.container}>

        {courses && courses.map((courses)=>(<CourseCard
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
        </div>
        </div>


    </React.Fragment>
  )
}
export default HomePage;
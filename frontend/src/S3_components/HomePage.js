import React, { useMemo } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from './CourseCard';
import h from "../S3_components/HomePage.module.css"
import { Carousel } from 'react-responsive-carousel';
import NavbarHomePage from './NavbarHomePage';
import Banner from './Banner';
import DivText from './DivText';
import Subjects from './Subjects';
import c from "../S3_components/CourseCard.module.css"
import clock from "../S3_components/clock.png"
import priceTag from "../S3_components/priceTag.png"
import arrowIcon from "../S3_components/arrowIcon.png"
import star from "../S3_components/star.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from './Footer';
const HomePage=()=>{
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2
  };
  const[courses,setCourses]= useState('');
  const [topRated,setTopRated]=useState('');
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

 





const  type="Guest";
var settings = {
    dots: true,
    infinite: false,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 2
  };


  return(
    <React.Fragment>
        <div>
        <NavbarHomePage></NavbarHomePage>
        <Banner></Banner>
        <DivText/>
        <Subjects></Subjects>
        <div>
          <h6 className={h.mostpopular}>Most Popular</h6>
          <img src={arrowIcon} className={h.arrow}></img>
      </div>
        <div className={h.container}>
        <Slider {...settings} >
        {mostPop && mostPop.map((courses)=>(<CourseCard
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
         </Slider>
        </div>
        <div>
          <h6 className={h.toppopular}>Top Rated</h6>
          <img src={arrowIcon} className={h.arrow2}></img>
      </div>
      <div className={h.container2}>
        <Slider {...settings} >
        {topRated && topRated.map((courses)=>(<CourseCard
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
         </Slider>
        </div>
        </div>
        <Footer></Footer>

    </React.Fragment>
  )
}
export default HomePage;
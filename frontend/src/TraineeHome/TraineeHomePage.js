import React from "react"
import HomePage from "../S3_components/HomePage"
import l from "../InstructorHome/InstSideBar.module.css"
import Slider from "react-slick";
import h from "../S3_components/HomePage.module.css"
import CourseCard from '../S3_components/CourseCard';
import arrowIcon from "../S3_components/arrowIcon.png"
import axios from "axios"
import { useEffect,useState } from "react";
import TraineeNavbar from "./TraineeNavbar"
import Subjects from "../S3_components/Subjects";
import { useParams } from "react-router-dom";
import DivText from '../S3_components/DivText';
import trainee from "./Trainee.module.css"
import Nav from "./TraineeNavbar.module.css"
const TraineeHomePage=()=>{
    const typeUser = localStorage.getItem("userType");
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
  
   
  
  
  
  
  
  var settings = {
      dots: true,
      infinite: false,
      speed: 800,
      slidesToShow: 5,
      slidesToScroll: 2
    };

    
    return(
        <React.Fragment>
        <TraineeNavbar/>
        <div className={Nav.divtext}>
        <h3 className={Nav.maintext1}>A broad selection of courses</h3>
        <h6 className={Nav.secondarytext1}>You can view hundereds of videos.</h6>
        </div>
        <Subjects></Subjects>
        <div>
          <h6 className={Nav.mostpopulart}>Most Popular</h6>
          <img src={arrowIcon} className={Nav.arrowt}></img>
      </div>
      <div className={Nav.top}>
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
         type2={typeUser}
        />))}
         </Slider>
        </div>
        </div>
        <div>
          <h6 className={Nav.toppopulart}>Top Rated</h6>
          <img src={arrowIcon} className={Nav.arrowt2}></img>
      </div>
      <div className={Nav.toptop}>
      <div className={h.container2}>
        <Slider {...settings} >
        {topRated && topRated.map((courses)=>(<CourseCard
         id={courses._id}
         title={courses.title}
         totalHours={courses.totalHours}
         rating={courses.rating}
         currency={courses.currency}
         price={courses.originalPrice}
         priceafter={courses.price}
         subject={courses.subject}
         description={courses.description}
         type="Guest"
         type2={typeUser}
        />))}
         </Slider>
        </div>
        </div>
        </React.Fragment>
    )

}
export default TraineeHomePage
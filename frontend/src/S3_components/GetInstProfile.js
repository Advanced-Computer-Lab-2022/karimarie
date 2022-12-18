import React from 'react'
import { Rating } from '@mui/material'
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import closeIcon from "../S3_components/closeButton.png"
import c from "../S3_components/CourseCard.module.css"
import ReactStars from 'react-stars'
import priceTag from "../S3_components/priceTag.png"
import axios from "axios"
import NavbarStyles from "../S3_components/NavbarHomePage.module.css"
import language from "../S3_components/language.png"
import closeButton from "../S3_components/closeButton.png"
import closeWhite from "../S3_components/closeWhite.png"
import filterIcon from "../S3_components/filterIcon.png"
import ViewMyCourses from '../InstructorHome/ViewMyCourses'
import Reviews from '../InstructorHome/Reviews'
import r from "../InstructorHome/Reviews.module.css"
import { useParams } from "react-router-dom";
import inst from "../InstructorHome/InstProfile.module.css"
import det from "./Details.module.css"
import quotationIcon from "../InstructorHome/quotation (1).png"
import star from "../S3_components/star.png"
import emptystar from "../InstructorHome/emptystar.png"



const GetInstProfile = () => {
    const id = useParams().id;
    console.log(id);
    const userType=useParams().userType
    const [Instructor,setInstructor]=useState("");
    const [rating,setRating]=useState("");
    const getInstructor = async () => {
        if(id!==''){
        const res = await axios
          .get(`http://localhost:2000/instructor/getByid2/${id}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          console.log(data)
          return data;
      }};
      useEffect(() => {
        getInstructor().then((data) => {setInstructor(data.inst)
            if(data.inst.rating===undefined){
                setRating(0)
              }else{
                setRating(Math.ceil(data.inst.rating*100)/100)
              }
              getInstReviews().then((data2)=>setReviews(data2.reviews))
        });
      }, []);
    const [coursesInst, setCourses] = useState([]);
    const [courselength,setCourselength]=useState(0);
    const [showCourse,setShowCourse]=useState("Start")
    const getCourses = async () => {
        const res = await axios
          .get(`http://localhost:2000/instructor/instCourses2/${id}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
      useEffect(() => {
        getCourses().then((data) => {setCourses(data)
        if(data.length!==0){
            setCourselength(data.length)
        }});
      }, []);
     
      const [Reviews1,isReviews]=useState(false);
      const [reviewsInst,setReviews]=useState("")
     
      const handleClose=()=>{
        isReviews(false);
      }
      const getInstReviews = async () => {
        
        const res = await axios
          .get(`http://localhost:2000/instructor/getInstructorReviews2/${id}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
     
    
     
  
    return (
      <React.Fragment>
        <div className={det.allalll}>
            {reviewsInst && 
            <div className={det.all}>
            <img src="https://source.unsplash.com/600x400/?food" alt="card__image" className={inst.image} width="600"/>    
            <p className={inst.firsttitle}>INSTRUCTOR</p>
            <p className={inst.name}>{Instructor.userName}</p>
            <p className={inst.shortdescription}>CEO of TheCodex.me - Teaching 500,000+ Students how to code</p>
            <p className={inst.emaill}>{Instructor.email}</p>
            <p className={inst.totalstudents}>Total Students</p>
            <p className={inst.totalstudentsnumber}>1,200</p>
            <p className={inst.totalreviews}>Total Reviews</p>
          <p className={inst.totalreviewsnumber}>{reviewsInst.length}</p>
            <p className={inst.averagerating}>Average Rating</p>
            {Instructor && <p className={inst.averageratingnumber}>{rating}</p>}
            <p className={inst.aboutme}>About Me</p>
            <p className={inst.aboutmetext}>{Instructor.biography}</p>
          <div>
            
           
           </div>
           
         
         {showCourse.localeCompare("Start")===0 && 
         <div className={inst.ViewCourses2}>
            <div className={inst.wrap}>
          
            </div>
            <p>My Courses ({courselength})</p>
            {coursesInst && coursesInst.map((courses)=><ViewMyCourses
         id={courses._id}
         title={courses.title}
        //  totalHours={courses.totalHours}
         rating={courses.rating}
         price={courses.originalPrice}
         priceafter={courses.price}
         Instructor={Instructor.userName}
         currency={courses.currency}
         subject={courses.subject}
         type="Guest"
         type2={userType}
        />
           )}
           
        </div>}

        {reviewsInst && <div className={det.CourseReviews2}>
    <div className={det.rattt}>
        {reviewsInst.length===0?  <div><img src={emptystar} alt="card__image" class={det.starimage1} width="40"/></div>: <div><img src={star} alt="card__image" class={det.starimage1} width="40"/></div>}
        {reviewsInst.length===0?<p className={det.noo}>No Ratings Yet.</p> : <p>{Instructor.rating} insturctir rating . {reviewsInst.length} ratings</p>}
    </div>
    {reviewsInst.map((review)=>(
            <div className={det.contR}>
            <Rating
            readOnly
            className={det.rating}
            value={review.rating}></Rating>
            <div className={det.move}>
            <p className={det.name}>Eliane Fares </p>
            </div>
            <p className={det.review}>{review.description}
             </p>
             <img className={det.quot1} src={quotationIcon}></img>
             </div>
        ))}
</div>}
       
       
        
          
          
           
           
                 
                </div>}
             
        </div>
         </React.Fragment>

    )
}

export default GetInstProfile
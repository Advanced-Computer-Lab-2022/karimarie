import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Subtitles from '../components/Subtitles';
import det from './Details.module.css'
import Rating from '@mui/material/Rating';
import NavbarHomePage from "./NavbarHomePage";
import novideo from "./novideo.png"
import emptystar from "../InstructorHome/emptystar.png"
import quotationIcon from "../InstructorHome/quotation (1).png"
import star from "../S3_components/star.png"

import priceTag from "./priceTag.png"



const ShowCourseDetails=()=> {
    const id = useParams().id;
    const [showText, setShowText] = useState(false);
    var newPrice = useParams().newPrice;
    newPrice=Math.ceil(newPrice*100)/100;
    const currencyP = useParams().currencyP;
    const type=useParams().type;
    const [Course, setCourses] = useState([""]);
    const [subtitles, setSubtitles] = useState([]);
    const [discountapplicable,ifdiscount]=useState(0);
    const [exam,isExamAvailable]=useState(false);
   const [instructorTable,setInstructorTable]=useState('')
    const sendRequest = async () => {
      const res = await axios
        .get(`http://localhost:2000/getByid/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
      // console.log(data)
      return data;
    };
    const sendRequest2 = async () => {
      const res = await axios
        .get(`http://localhost:2000/getExamSol/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };
    const getInstId = async () => {
      if(Course!='' && ready==true){
        isready()
      const res = await axios
        .get(`http://localhost:2000/instructor/getByid2/${Course.instructor}`)
        .catch((err) => console.log(err));
        const data = await res.data;
        // console.log(data)
        return data;
    }};

  
   



    const [freecourse,isfree]=useState(false)
    const [ready,isready]=useState(false);

    useEffect(() => {
      sendRequest().then((data) => {setCourses(data.course) 
        setSubtitles(data.course.subtitles)
        isready(true);
        
      });
      
     sendRequest2().then((data)=>{
      if(data.exam.toString().localeCompare([])===0){
        isExamAvailable(false)
      }else {
        isExamAvailable(true)
      }
     }
    
     )
     if(newPrice===0){
        isfree(true);
     }

    }, []);
    const [reviewsC,setReviewsC]=useState();
    useEffect(()=>{
       
            getInstId().then((data2)=>setInstructorTable(data2));
            getCourseReviews().then((data3)=>setReviewsC(data3.reviews))

        
    },[Course,ready])
  
    
   
   

    const getCourseReviews = async () => {
        if(Course!==""){
        const res = await axios
          .get(`http://localhost:2000/getCourseReviews/${Course._id}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          console.log(data)
          return data;
      }};
    
     return(
      <React.Fragment>
        <NavbarHomePage></NavbarHomePage>
        { instructorTable && 
        <div>
        <div className={det.wholee} sx={{ minWidth: 275 }}>
        <Typography className={det.tie} variant="h5" component="div" sx={{ fontSize: 30 }}>
          {Course.title}
        </Typography>
        <Typography className={det.tie2} sx={{ fontSize: 25 }}>  {Course.description}</Typography>
        <Typography sx={{ mb: 1.5 }} >
            <div className={det.tagbrown1}>
            {Course.subject}
           </div>
        </Typography>
        <Typography sx={{ mb: 1.5 }}   >
      {type==="Guest" &&  <a href={`/instprofile/${Course.instructor}`}>
          Instructor: {instructorTable.inst.userName}
          </a>}
        {type==="Instructor" && <a href={`/profile`}>
          Instructor: {instructorTable.inst.userName}
          </a>}
        </Typography>
        <Typography>
           
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-clock" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
</svg>
<div className={det.al}>{Course.totalHours} Hours</div>
        </Typography>
        <Typography variant="body2">
           <Rating className={det.readOnlye} value={Course.rating} precision={0.5} readOnly />
           <br />
         
        </Typography>

      
     


    </div>
    <div className={det.previewe}>
        <iframe className={det.vide} src={Course.preview} title="YouTube video" allowfullscreen></iframe><br></br>
        <Typography className={det.priceX} sx={{ mb: 1.5 }} >
         {freecourse===false && <div>Price:  {newPrice}  {currencyP} ({discountapplicable}%  Discount Applicable)</div>}
         {(freecourse===true || type==="Instructor") && <div>FREE</div>}
        </Typography>
       
        {type==="Guest" && <div><button class={det.buttonAe}  onClick={()=>window.location.href="/signup"}>Buy Now</button><br></br></div>}
        {type==="Instructor" &&  <button class={det.buttonAe} >Add Promotion</button>}

        </div>
  
<div className={det.main9e}>
<h2 className={det.titlee}>Subtitles</h2>
<section className={det.sectione}>
    {Course.subtitles&&Course.subtitles.map((subtitles,i) =>(
                <details className={det.detailse}>
                <summary className={det.summarye}>
                {subtitles.title}
                </summary>
                <p className={det.insidee}>
               {type==="Instructor" && <div><iframe src={subtitles.Video} title="YouTube video" allowfullscreen></iframe><br></br></div>}
               {type==="Guest" && freecourse===true && <div><iframe src={subtitles.Video} title="YouTube video" allowfullscreen></iframe><br></br></div>}
               {type==="Guest" && freecourse===false && <img src={novideo} alt="card__image" class={det.novideo} width="40"></img>}
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-clock" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
</svg>
<div className={det.al2}>  {subtitles.totalHours} Hours<br></br></div>
                        Descripton: {subtitles.shortDescrip}<br></br>
                        {/* <button class={det.buttonAe} role="button">Solve Exam</button> */}
                </p>
            </details>
 ))}
    </section>

</div>
{reviewsC && <div className={det.CourseReviews}>
    <div className={det.rattt}>
        {reviewsC.length===0?  <div><img src={emptystar} alt="card__image" class={det.starimage1} width="40"/></div>: <div><img src={star} alt="card__image" class={det.starimage1} width="40"/></div>}
        {reviewsC.length===0?<p className={det.noo}>No Ratings Yet.</p> : <p>{Course.rating} course rating . {reviewsC.length} ratings</p>}
    </div>
    {reviewsC.map((review)=>(
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
</React.Fragment>
     )
}
export default ShowCourseDetails;
import React from 'react'
import x from "./VMyC.module.css"
import { useEffect, useState } from "react";
//import arrowIcon from "./arrowIcon.png"
import x2 from "./Rate.module.css"
import { getAccordionActionsUtilityClass, Typography } from '@mui/material'
import axios from "axios";
import Rating from '@mui/material/Rating';
import closeIcon from '../S3_components/closeButton.png'
import {useParams } from "react-router-dom";
import TraineeNavbar from './TraineeNavbar';

const VMyCourses = () => {
    const id = useParams().id;
    const id2 = useParams().id;
    const [course,setCourse]=useState('');
    const [description,setReview]=useState('');
    const [rating,setRating]=useState('');
    const[review,isShowReview]=useState(false);

    const [instructor,setInstructor]=useState('');
    const [descriptionInst,setReviewInst]=useState('');
    const [ratingInst,setRatingInst]=useState('');
    const[reviewInst,isShowReviewInst]=useState(false);

	const continueDet= (e) => {
       window.location.href="/Bye/${}"
    }
	const [myCourses,setMyCourses]=useState([]);
    const HandleSubmit= (e) => {
        e.preventDefault();
        addReview();
        setCourse('')
         setReview('')
         setRating('')
     
    }
    const HandleSubmitInst= (e) => {
        e.preventDefault();
        addReviewInst();
        setInstructor('')
         setReviewInst('')
         setRatingInst('')
       
    }
     const addReview = async () => {
        if(id!=''){
                const res = await axios
                .post(`http://localhost:2000/corpTrainee/addCourseReview/${id}`, {
                  rating:rating,
                  description:description
                })
                .catch((err) => console.log(err));
                
            };
        } 
        const addReviewInst = async () => {
            if(id2!=''){
                    const res = await axios
                    .post(`http://localhost:2000/addInstructorReview/${id2}`, {
                      rating:ratingInst,
                      description:descriptionInst
                    })
                    .catch((err) => console.log(err));
                    
                };
            }
        const showReview=(e)=>{
           isShowReview(true);
        }
        const showReviewInst=(e)=>{
           isShowReviewInst(true);
        }
        
        const writeReview=(e)=>{
            addReview();
            isShowReview(false);
            setReview('')
            window.location.href="/hi"
            e.preventDefault();
         }

         const writeReviewInst=(e)=>{
            addReviewInst();
            isShowReviewInst(false);
            setReviewInst('')
            window.location.href="/hi"
            e.preventDefault();
         }

         const hideReview=(e)=>{
            isShowReview(false);
    
         }
         const hideReviewInst=(e)=>{
            isShowReviewInst(false);
    
         }

         const getCourses = async () => {
            const res = await axios
              .get(`http://localhost:2000/corpTrainee/getTrainee/${localStorage.getItem("token")}`)
              .catch((err) => console.log(err));
              const data = await res.data;
              return data;
          };
          const [finalarray,setfinal]=useState([])
          const [interarray,setinter]=useState([])
          const [count,setcount]=useState(1)
          useEffect(() => {
            
            getCourses().then((data) => { setMyCourses(data.trainee.courses); getActual(data.trainee.courses)
          })
          
        }, []);

          const getActual=async(courses)=>{
            let res;
            courses.map( async (id,i) => (
                    
                res = await axios
                .get(`http://localhost:2000/getByid/${id}`)
                .catch((err) => console.log(err)).then((data)=>{
                    interarray[i]=data.data.course
                   setcount(i)
                   if(i===courses.length-1){
                    setfinal(interarray)
                   }
                    
                })
                
               
               
                ))
          }
          
      
  return (
    <React.Fragment>
		<TraineeNavbar/>
		<div className={x.title}>
          <h6 className={x.mostpopular}>My Courses</h6>
		  </div>
		<div className={x.bodyy}>
	
        <div className={x.hi}>
		{finalarray &&finalarray.map((req,i) =>(
					<div className={x.course}>
						<div className={x.coursepreview}>
							<h6 className={x.courseh6}>Course</h6>
							<h2 className={x.title}>{req.title}</h2>
							<a href={`/Bye/${req._id}`}>View all chapters <i class="fas fa-chevron-right"></i></a>
						</div>
						<div className={x.courseinfo}>
							<div className={x.progresscontainer}>
								<div className={x.progress}></div>
								<span className={x.progresstext}>
									6/9 Challenges
								</span>
							</div>
							<h6 className={x.chapterNum}>Chapter 4</h6>
							<h2 className={x.chapterName}>Callbacks & Closures</h2>
                             <button className={x2.para} onClick={showReview}> Rate and Review Course</button>
                             <br></br>
                             <button className={x2.para} onClick={showReviewInst}> Created By InstName</button>
                             <button className={x.btn} onClick={()=>window.location.href=`/Bye/${req._id}`}>Continue</button>


                          {review &&  
                           <div className={x2.shadearea}> 
                           <form className={x2.try} onSubmit={HandleSubmit}> 
          <div className={x2.modalcontainer}>
                <p className={x2.editbiotext}>Write a Review</p>
                <textarea className={x2.edittextfield} value={description} onChange={(e) => setReview(e.target.value)}>
                </textarea>

                <button className={x2.submiteditbutton} onClick={writeReview}>Submit</button>
               
                <p className={x2.rateText}>Rate Course</p>

                <Rating className={x2.stars} value={rating}  onChange={(event, newValue) => {
    setRating(newValue)}}/>



            </div>
            </form>
            <button onClick={hideReview} className={x2.closeedit}  >
                    <img src={closeIcon} ></img></button>
            </div> }
            {reviewInst &&  
                           <div className={x2.shadearea}> 
                           <form className={x2.try} onSubmit={HandleSubmitInst}> 
          <div className={x2.modalcontainer}>
                <p className={x2.editbiotext}>Write a Review</p>
                <textarea className={x2.edittextfield} value={descriptionInst} onChange={(e) => setReviewInst(e.target.value)}>
                </textarea>

                <button className={x2.submiteditbutton} onClick={writeReviewInst}>Submit</button>
               
                <p className={x2.rateText}>Rate Instructor</p>

                <Rating className={x2.stars} value={ratingInst}  onChange={(event, newValue) => {
    setRatingInst(newValue)}}/>



            </div>
            </form>
            <button onClick={hideReviewInst} className={x2.closeedit}  >
                    <img src={closeIcon} ></img></button>
            </div>  }
						</div>
					</div>
				
				
))}
</div>
</div>
    </React.Fragment>
  )
}

export default VMyCourses
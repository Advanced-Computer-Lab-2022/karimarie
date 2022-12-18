import React from 'react'
import x from "./VMyC.module.css"
import { useEffect, useState } from "react";
//import arrowIcon from "./arrowIcon.png"
import x2 from "./Rate.module.css"
import { Box, getAccordionActionsUtilityClass, Typography } from '@mui/material'
import axios from "axios";
// import Rating from '@mui/material/Rating';
import closeIcon from '../S3_components/closeButton.png'
import {useParams } from "react-router-dom";
import TraineeNavbar from './TraineeNavbar';
import { Rating } from 'react-simple-star-rating'

const VMyCourses = () => {
    const id = useParams().id;
    const id2 = useParams().id;
    const [course,setCourse]=useState('');
    const [description,setReview]=useState('');
    const [rating,setRating]=useState(0);
    const[review,isShowReview]=useState(false);

    const [instructor,setInstructor]=useState('');
    const [descriptionInst,setReviewInst]=useState('');
    const [ratingInst,setRatingInst]=useState(0);
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
     const addReview = async (courseid) => {
        if(id!=''){
                const res = await axios
                .post(`http://localhost:2000/corpTrainee/addCourseReview/${courseid}`, {
                  rating:rating,
                  description:description
                })
                .catch((err) => console.log(err));
                
            };
        } 
        const addReviewInst = async (instid) => {
            if(instid!=''){
              console.log(ratingInst)
                    const res = await axios
                    .post(`http://localhost:2000/addInstructorReview/${instid}`, {
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
        
        const writeReview=(courseid)=>{
            addReview(courseid);
            isShowReview(false);
            setReview('')
            window.location.reload()
            setRating(0)
         }

         const writeReviewInst=(instid)=>{
            addReviewInst(instid);
            isShowReviewInst(false);
            setReviewInst()
            setRatingInst(0)
            window.location.reload();
            // e.preventDefault();
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
          const [instids,setinstids]=useState([])
          const [count,setcount]=useState(1)
          useEffect(() => {
            
            getCourses().then((data) => { setMyCourses(data.trainee.courses); getActual(data.trainee.courses)
          })
          
        }, []);
          const [user,setuser]=useState([])
          const [userfinal,setuserfinal]=useState([])
          const getActual=async(courses)=>{
            let res;
            let res2;
            courses.map( async (id,i) => (
                    
                res = await axios
                .get(`http://localhost:2000/getByid/${id}`)
                .catch((err) => console.log(err)).then((data)=>{
                    interarray[i]=data.data.course
                    instids[i]=data.data.course.instructor
                   setcount(i)
                   if(i===courses.length-1){
                    setfinal(interarray)
                    // setinstids(instids)
                    instids.map(async(inst,i)=>{
                      res2 = await axios
                      .get(`http://localhost:2000/instructor/getByid2/${inst}`)
                      .catch((err) => console.log(err));
                      user[i] = await res2.data.inst.userName;
                      console.log(user)
                      console.log(i)
                      console.log(instids.length)
                      if(i===instids.length-1){
                        console.log()
                        setuserfinal(user)
                      }
                    })
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
							<a href={`/Bye/${req._id}/${req.instructor}`}>View all chapters <i class="fas fa-chevron-right"></i></a>
						</div>
						<div className={x.courseinfo}>
							<div className={x.progresscontainer}>
								<div className={x.progress}></div>
								<span className={x.progresstext}>
									6/9 Challenges
								</span>
							</div>
							<Rating size="25" initialValue={req.rating} allowFraction="true" readonly="true"/>
							<p className={x.chapterName}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-clock" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
</svg> {req.totalHours} Hours</p>
                             <button className={x2.para} onClick={showReview}> Rate and Review Course</button>
                             <br></br>
                             <button className={x2.para} onClick={showReviewInst}> Rate Instructor {user[i]}</button>
                             <button className={x.btn} onClick={()=>window.location.href=`/Bye/${req._id}/${req.instructor}`}>Continue</button>


                          {review &&  
                           <div className={x2.shadearea}> 
                           <form className={x2.try} > 
          <div className={x2.modalcontainer}>
                <p className={x2.editbiotext}>Write a Review</p>
               
                <textarea className={x2.edittextfield} value={description} onChange={(e) => setReview(e.target.value)}>
                </textarea>

                <button className={x2.submiteditbutton} onClick={()=>writeReview(req._id)}>Submit</button>
                
                <Rating size="25" className={x2.stars} initialValue={rating}  onClick={(event) => {
    setRating(event)}}/>
                <p className={x2.rateText}>Rate Course</p>
                



            </div>
            </form>
            <button onClick={hideReview} className={x2.closeedit}  >
                    <img src={closeIcon} ></img></button>
            </div> }
            {reviewInst &&  
                           <div className={x2.shadearea}> 
                           <form className={x2.try} > 
          <div className={x2.modalcontainer}>
                <p className={x2.editbiotext}>Write a Review</p>
                <textarea className={x2.edittextfield} value={descriptionInst} onChange={(e) => setReviewInst(e.target.value)}>
                </textarea>

                <button className={x2.submiteditbutton} onClick={()=>writeReviewInst(req.instructor)}>Submit</button>
               
                <p className={x2.rateText}>Rate Instructor</p>

                <Rating size="25" className={x2.stars} initialValue={ratingInst}  onClick={(event) => {
    setRatingInst(event)}}/>



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
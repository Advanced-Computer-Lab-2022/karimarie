import React, { useRef } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
//import AllCourses2 from '../AllCourses2';
import { Button, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';

const ViewMyRatings =()=>{
    const [instructor,setInstructor]=useState('');
    const [reviews,setReviews]=useState('');
    const [choose,setChoose]=useState();
    const [instructorTable,setInstructorTable]=useState('');
    const HandleSubmit= (e) => {
        e.preventDefault();
        sendRequest().then((data) => setReviews(data.reviews));
        sendRequest2().then((data)=>setInstructorTable(data));
        setChoose('ViewReviews')
    }
    const sendRequest = async () => {
        if(instructor!=''){
        const res = await axios
          .get(`http://localhost:2000/instructor/getInstructorReviews/${instructor}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      }};
    
    const sendRequest2 = async () => {
        if(instructor!=''){
            console.log("hi")
        const res = await axios
          .get(`http://localhost:2000/instructor/getByid/${instructor}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      }};
    
    //   useRef(() => {
    //     sendRequest().then((data) => setReviews(data.reviews))
    //     sendRequest2().then((data)=>setInstructorTable(data))
        
    //   }, [choose]);
    console.log(reviews)
    console.log(choose);
    //console.log(instructorTable.inst.rating)
    return(
            <React.Fragment>
            <form className="create" onSubmit={HandleSubmit} >  
            <h3>Enter Your ID :</h3>
        <input 
            type="text" 
            onChange={(e) => setInstructor(e.target.value)} 
            value={instructor}
        />
        <button>Search</button></form>

        <div>
    <Typography component="legend"></Typography>
    {instructorTable &&
    <div>
        <p>Average Rating : </p>
        <Rating name="read-only" value={instructorTable.inst.rating} precision={0.5}  readOnly />
    </div> }


    
    {reviews 
    && reviews.map(review =>
    <div>
    <div>
    {review.description}
    </div>
    <Rating name="read-only" value={review.rating} readOnly />
    </div>
        )}   

        </div> 
        </React.Fragment>
    );
}

export default ViewMyRatings;
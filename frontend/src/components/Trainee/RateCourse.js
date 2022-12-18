// import { useState } from 'react'
// import { Typography } from '@mui/material'
// import React from 'react'
// import { useEffect } from "react";
// import axios from "axios";
// import Rating from '@mui/material/Rating';



// const RateCourse = () => {
//     const [course,setCourse]=useState('');
//     const [description,setReview]=useState('');
//     const [rating,setRating]=useState('');
//     const [choose,setChoose]=useState('');
//     const HandleSubmit= (e) => {
//         e.preventDefault();
//         sendRequest();
//         setChoose('Activate')
//         setCourse('')
//          setReview('')
//          setRating('')
//         console.log(description);
//         console.log(course)
//     }
//     console.log(rating);
//     const sendRequest = async () => {
//         if(course!=''){
//                 const res = await axios
//                 .post(`http://localhost:2000/corpTrainee/addCourseReview/${course}`, {
//                   rating:rating,
//                   description:description
//                 })
//                 .catch((err) => console.log(err));
                
//             };
//         }
//     return(
//         <form className="create" onSubmit={HandleSubmit}> 
//         <h3>Rate A Course</h3>
        
//         <label>Course ID:</label>
//         <input 
//           type="text" 
//           onChange={(e) => setCourse(e.target.value)} 
//           value={course}
//         />
//         <label>Rating:</label>
//         <Rating name="write" value={rating}  onChange={(event, newValue) => {
//     setRating(newValue)}}/>
  
//         <label>Review:</label>
//         <input 
//           type="text" 
//           onChange={(e) => setReview(e.target.value)} 
//           value={description}
//         />
        
//       <button>Rate Course</button>
//         </form>
//     )
// }

// export default RateCourse;
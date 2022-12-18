// import { useState } from 'react'
// import { Typography } from '@mui/material'
// import React from 'react'
// import { useEffect } from "react";
// import axios from "axios";
// import Rating from '@mui/material/Rating';



// const RateInstructor = () => {
//     const [instructor,setInstructor]=useState('');
//     const [description,setReview]=useState('');
//     const [rating,setRating]=useState('');
//     const [choose,setChoose]=useState('');
//     const HandleSubmit= (e) => {
//         e.preventDefault();
//         sendRequest();
//         setChoose('Activate')
//         setInstructor('')
//          setReview('')
//          setRating('')
//         console.log(rating);
//         console.log(description);
//     }
//     const sendRequest = async () => {
//         if(instructor!=''){
//                 const res = await axios
//                 .post(`http://localhost:2000/addInstructorReview/${instructor}`, {
//                   rating:{rating},
//                   description:{description}
//                 })
//                 .catch((err) => console.log(err));
                
//             };
//         }
//     return(
//         <form className="create" onSubmit={HandleSubmit}> 
//         <h3>Rate An Instructor</h3>
        
//         <label>Instructor ID:</label>
//         <input 
//           type="text" 
//           onChange={(e) => setInstructor(e.target.value)} 
//           value={instructor}
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
        
//       <button>Rate Instructor</button>
//         </form>
//     )
// }

// export default RateInstructor;
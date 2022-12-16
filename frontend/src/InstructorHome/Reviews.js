import React from 'react'
import r from "./Reviews.module.css"
import Rating from '@mui/material/Rating';
import quotationIcon from "./quotation (1).png"
import inst from "./InstProfile.module.css"
const Reviews = ({review,rating}) => {
    return (
        
       
           <React.Fragment>
                
                <div className={r.containerrx}>
            <Rating
            readOnly
            className={r.rating}
            value={rating}></Rating>
            <div className={r.move}>
            <p className={r.name}>Eliane Fares </p>
            <p className={r.type}>Instructor</p>
            </div>
            <p className={r.review}>{review}
             </p>
             <img className={r.quot} src={quotationIcon}></img>
             </div>
             </React.Fragment>
           
            
       
    )
}

export default Reviews
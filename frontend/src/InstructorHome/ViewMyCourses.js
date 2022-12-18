

import React, { useMemo } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import inst from "./InstProfile.module.css"
import c from "../S3_components/CourseCard.module.css"

import emptystar from "./emptystar.png"
import priceTag from "../S3_components/priceTag.png"
import star from "../S3_components/star.png"
import { Rating } from '@mui/material';




const ViewMyCourses = ({id,title,totalHours,rating,price,priceafter,currency,type,type2,Instructor,subject,description}) => {
  console.log(priceafter)
    const [newPrice,setNewPrice]= useState('')
    const [pricediscount,setpricediscount]=useState('')
    const [ratingCurrent,isRating]= useState('')
    const country=localStorage.getItem("country");
    const currencySelected=localStorage.getItem("currency")
    if(country==="" && currencySelected===""){
      localStorage.setItem("country","Egypt");
      localStorage.setItem("currency","EGP");
    }
   
    const base_URL='https://api.exchangerate.host/latest'
    const [currencyOptions,setCurrencyOptions]=useState('');
    const [fromCurrency,setFromCurrency]=useState('');
    const [toCurrency,setToCurrency]=useState('')
    const [amount,setAmount]=useState(1);
    const [exchangeRate,setExchanheRate]=useState('')
    const getExchangeRate = async () => {
        const res = await axios
          .get(base_URL)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
    
    useEffect(()=>{
        getExchangeRate().then(data =>{setCurrencyOptions([data.base,...Object.keys(data.rates)])
        setFromCurrency(currency)
        setToCurrency(currencySelected)
        setExchanheRate(data.rates[toCurrency])}
        )
        if(rating){
          isRating(Math.ceil((rating)*100)/100);
        }else {
          isRating(0)
        }
        
   },[])
   useEffect(()=>{
    if(fromCurrency!=null && toCurrency!=null){
   const res= axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then(
        res=>res.data).then(data => setExchanheRate(data.rates[toCurrency]))}}
    ,[fromCurrency,toCurrency])
    
   
  
            useEffect(()=>{
            setNewPrice(Math.ceil((price)*exchangeRate*100)/100)
            setpricediscount(Math.ceil((priceafter)*exchangeRate*100)/100)
        },[exchangeRate])
    return(
        <React.Fragment>
       <div className={inst.ViewCourses}>
       <a href={`/course/${id}/${newPrice}/${currency}/${type}/${type2}/${pricediscount}`} className={inst.ref}>
             <img src="https://source.unsplash.com/600x400/?food" alt="card__image" className={inst.courseimg} width="140"/> 
             <div><h2>{title}</h2> 
             <span className={c.tagbrown}>{subject}</span>
             </div>
             <div><i className={["material-icons-outlined"].join(' ')} >account_circle</i>{" "}<p>{Instructor}</p></div>
             <div className={inst.rat}>
             <p>{ratingCurrent}</p>
             </div>
             {ratingCurrent===0?  <div><img src={emptystar} alt="card__image" class={inst.starimage1} width="16"/></div>: <div><img src={star} alt="card__image" class={inst.starimage1} width="20"/></div>}
            {type2!=="CorpTrainee" && <div className={inst.pricee}>
             <img src={priceTag} alt="card__image" class={c.priceimage} width="20"/>
             </div>}
             {type2!=="CorpTrainee" && newPrice===0 &&  <div className={inst.priceetext}><p>FREE</p></div>}
            {type2!=="CorpTrainee" && newPrice!==0  && newPrice===pricediscount && <div className={inst.priceetext}><p>{newPrice} {currencySelected}</p></div >}
            {type2!=="CorpTrainee" && newPrice!==0  && newPrice!==pricediscount && <div><div  className={inst.priceetext1}><p>{newPrice} {currencySelected}</p></div><div className={inst.priceetext11}><p >{pricediscount} {currencySelected}</p></div></div> }
             </a>
              </div>
    </React.Fragment>
    )
    
}
export default ViewMyCourses
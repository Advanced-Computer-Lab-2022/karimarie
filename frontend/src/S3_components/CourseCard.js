import React, { useMemo } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import c from "../S3_components/CourseCard.module.css"
import clock from "../S3_components/clock.png"
import priceTag from "../S3_components/priceTag.png"
import star from "../S3_components/star.png"
import  Rating from '@mui/material/Rating';
const CourseCard=({id,title,totalHours,rating,price,currency,type,subject,description}) =>{

  const [newPrice,setNewPrice]= useState('')
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
        isRating(rating);
      }else {
        isRating("No Ratings Yet")
      }
      
 },[])
 useEffect(()=>{
  if(fromCurrency!=null && toCurrency!=null){
 const res= axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then(
      res=>res.data).then(data => setExchanheRate(data.rates[toCurrency]))}}
  ,[fromCurrency,toCurrency])
  
 

          useEffect(()=>{
          setNewPrice((price)*exchangeRate);
    
      },[exchangeRate])
return (
    <React.Fragment>
           
         {type==='Guest' && 
<div class={c.card}>
    <div class={c.cardheader}>
      <img src="https://source.unsplash.com/600x400/?food" alt="card__image" class={c.cardimage} width="600"/>
      </div>
    <div class={c.cardbody}>
      <span class={c.tagbrown}>{subject}</span>
      <h4>{title}</h4>
      <p >{description}</p>
    </div>
    <div class={c.cardbottom}>
    <div class={c.cardfooter}>
    <img src={clock} alt="card__image" class={c.clockimage} width="20"/>
    <p> {totalHours} Hours</p>  
    </div>
    <div class={c.cardfooter3}>
    <img src={priceTag} alt="card__image" class={c.priceimage} width="20"/>
    <p>{newPrice} {currencySelected}</p>
    </div>
    <div class={c.cardfooter2}>
    <Rating name="read-only" value={rating}  defaultValue={rating} precision={0.5} class={c.starimage} width="20" readOnly />
    {/* <img src={star} alt="card__image" class={c.starimage} width="20"/> */}
    <p> {ratingCurrent}</p>
    </div>
    </div>
  </div>
  }
 
    </React.Fragment>
    )
}
export default CourseCard
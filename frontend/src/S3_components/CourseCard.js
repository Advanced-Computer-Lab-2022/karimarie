import React, { useMemo } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import c from "../S3_components/CourseCard.module.css"
import clock from "../S3_components/clock.png"
import priceTag from "../S3_components/priceTag.png"
import star from "../S3_components/star.png"
import  Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';
const CourseCard=({id,title,totalHours,rating,price,priceafter,currency,type,type2,subject,description}) =>{
  const [newPrice1,setNewPrice1]= useState('')
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
        isRating("")
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
return (
    <React.Fragment>
           
         {type==='Guest' && 
<div class={c.card}>
<a href={`/course/${id}/${newPrice}/${currencySelected}/${type}/${type2}/${pricediscount}`} className={c.ref}>
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
   {type2!="CorpTrainee" && <img src={priceTag} alt="card__image" class={c.priceimage} width="20"/>}
    {type2!=="CorpTrainee" && newPrice!==0  && newPrice!==pricediscount && <div><div  className={c.priceetext1}> <p>{newPrice} {currencySelected}</p></div><div className={c.priceetext11}><p >{pricediscount} {currencySelected}</p></div></div> }
    {type2!=="CorpTrainee" && newPrice!==0 &&newPrice===pricediscount  && <p className={c.ppp}>{newPrice} {currencySelected}</p>}
     {type2!=="CorpTrainee" && newPrice===0 && <p>FREE</p>}
    </div>
    <div class={c.cardfooter2}>
    <Rating name="read-only"  defaultValue={rating} precision={0.5} className={c.starimage} width="20" readOnly />
    {/* <img src={star} alt="card__image" class={c.starimage} width="20"/> */}
    <p className={c.ratingnum}> {ratingCurrent}</p>
    </div>
    </div>
    </a>
  </div>
  }
  
 
    </React.Fragment>
    )
}
export default CourseCard
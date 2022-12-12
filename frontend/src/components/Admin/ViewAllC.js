import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

const ViewAllC = () => {
    const [price,setPrice]=useState();
    const [rating,setRating]=useState('');
    useEffect(()=>{
        //   getCountires().then((data) => setCountries(data))
        e.preventDefault()
        getAll().then((data) => {           
        let x=JSON.stringify(data.priceList)
        window.location.href=`FilterSearchPage?courses=${x}`
      }
        )
        isShowFilter(false);
        setPrice('');
        setRating('');
            
          },[]);
          const getAll=async()=>{
            const res = await axios
                    .get("http://localhost:2000/home")
                    .catch((err) => console.log(err));
                    const data = await res.data;
                    return data;
        }
             
  return (
    <div>ViewAllC</div>
  )
}

export default ViewAllC
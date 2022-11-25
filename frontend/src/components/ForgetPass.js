import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
const ForgetPass = () => {
    //const country=useParams.currentCountry;
    const sendRequest = async () => {
    
        const res = await axios
          .get("http://localhost:2000/sendMailAll")
          .catch((err) => console.log(err));
          const data = await res.data;
    
          return data;
      };
      useEffect(() => {
    
        sendRequest();
        
        
      }, []);
    return (
      <div>
        An email has been sent
      </div> 
    )
  }
  export default ForgetPass
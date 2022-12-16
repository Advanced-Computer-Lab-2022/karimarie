import React from 'react'
import x from "./VRQ.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
const ViewRefundReq = () => {
  const [requests,setRequests]=useState([]);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:2000/admin/viewRefundReq")
      .catch((err) => console.log(err));
      const data = await res.data;

      return data;
  };
  const [xx,setX]=useState("hey");
  const SuccMessage = () => (
    <div >errorM</div>  
  ); 
  useEffect(() => {
    sendRequest().then((data) => {setRequests(data.list);
    }
    
    
    );
   
    
  }, [xx]);
 
  
    const refund=async (c)=>{
      console.log("hey")
      const res = await axios
      .post("http://localhost:2000/admin/returnMoney",{
        id:c
      })
      .catch((err) => console.log(err));
      const data = await res.data;
      setX(c);
      return data;
      
  }

  return (
   <React.Fragment>
        <h2 className={x.title}>Refund Requests</h2>

    <div className={x.wrapper}>
  
  <div className={x.table}>
    
    <div className={[x.row, x.header].join(' ')}>
      <div className={x.cell}>
        Name
      </div>
      <div className={x.cell}>
       Course 
      </div>
      <div className={x.cell}>
        Amount
      </div>
      <div className={x.cell}>
        Action
      </div>
    </div>
    
   {requests&&requests.map((req,i) => (

<div className={x.row}>
<div className={x.cell} >
 {req.traineeName}
</div>
<div className={x.cell} >
{req.courseName}
</div>
<div className={x.cell} >
    {req.amount}
</div>
<div className={x.cell} >
<button  className={x.b10} onClick={() => refund(req._id)}>Refund</button>


</div>


</div>

   ))} 
    </div>
  </div>
  
  
 
  

   </React.Fragment>
  )
}
export default ViewRefundReq
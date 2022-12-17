import React from 'react'
import det from "./CReq.module.css" 
import t from "./t.png";
import { useEffect, useState } from "react";
import axios from "axios";
import x from "./CReq.module.css"

const ViewReq = () => {
const [requests,setRequests]=useState([]);
const [r,setR]=useState([])
const [b,setB]=useState()
const sendRequest = async () => {
    const res = await axios
        .get("http://localhost:2000/admin/viewReq")
        .catch((err) => console.log(err));
        const data = await res.data;

        return data;
    };
      const [xx,setX]=useState("hey");
      const SuccMessage = () => (
        <div >errorM</div>  
      ); 
useEffect(() => {
        sendRequest().then((data) => {
            const result=data.req.sort((a,b)=>a.corporateName.localeCompare(b.corporateName))
            let obj = result.reduce((res, curr) =>
            {
                if (res[curr.corporateName])
                    res[curr.corporateName].push(curr);
                else
                    Object.assign(res, {[curr.corporateName]: [curr]});
        
                return res;
            }, {});
            for (var i = 0; i < Object.keys(obj).length; i++) {
               r[i]=obj[Object.keys(obj)[i]]
               console.log(r);
            }
            setB(true)
         
        }
        );

   
            }, [xx]);
 const pressButton=async (id,value)=>{
        console.log(id);
        console.log(value);
        const res = await axios
        .post("http://localhost:2000/admin/giveCourse",{
            id:id,
            answer:value
        })
        .catch((err) => console.log(err));
        const data = await res.data;
        setX(id);
        return data;
        
    };
     
  return (
 
<React.Fragment>
    <h2 className={x.title}>Course Requests</h2>

{b&&r&& r.map((req,i) => (
    <React.Fragment>
        <div className={x.nnn}>
            <h3>{req[i].corporateName}</h3>
      <div className={x.table}>
    
      <div className={[x.row, x.header].join(' ')}>
        <div className={x.cell}>
          UserName
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
      
     {r&&r[i].map((req2,i) => (
  
  <div className={x.row}>
  <div className={x.cell} >
   {req2.corpName}
  </div>
  <div className={x.cell} >
  {req2.corpName}
  </div>
  <div className={x.cell} >
  45 EGP
  </div>
  <div className={[x.cell, x.ch].join(' ')} >
  <button  className={x.b10} value={true} onClick={(e)=>pressButton(req2._id,e.target.value)}>Accept</button>
  <button  className={x.b11} value={false} onClick={(e)=>pressButton(req2._id,e.target.value)} >Decline</button>

  
  </div>
  
  
  </div>
  
     ))} 
        </div>
      </div>
      </React.Fragment>
 ))}

</React.Fragment>
  )
}

export default ViewReq
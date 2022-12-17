import React from 'react'
import x from "./notiff.module.css"
import { useState,useEffect } from 'react'

import axios from "axios"

const Notif = () => {
    const[noti,setNoti]=useState()
   const [notilength,setnotilength]=useState(0);
    const[userId,setUserId]=useState("639dd6e8b7219cea8f3b53cb") 
    const sendRequest = async () => {
        const res = await axios
          .get(`http://localhost:2000/getMyNotification/${userId}`) 
          .catch((err) => console.log(err));
          const data = await res.data;
        console.log(data);
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => {setNoti(data.resultList);console.log(data.resultList)});
       
        
      }, []);  

  return (
    <React.Fragment>
      {noti&&  <div className={x.container}>
            <input type="checkbox" name="" className={x.btn} />
            <div className={x.box}>
                <div className={x.header}>
                    <p>Notifications</p>
                </div>
                <div className={x.content}>   
                {noti&&noti.map((req,i) => (
                    <div className={x.notification}>
                        {req.type=="Course Requested"&&<i className={["fa fa-book", x.iconn].join(' ')} aria-hidden="true"></i>}
                        {req.type=="refund"&&<i className={["fa fa-money", x.iconn].join(' ')} aria-hidden="true"></i>}

                        <div className={x.text}>
                            <p>
                                {/* <span className={x.name}>Harry Potter</span>  */}
                                {req.message}
                            </p>
                            <p class="time">1 hour ago </p>
                        </div>
                    </div>
                 ))}
                </div>
            </div>
        </div>}
    </React.Fragment>
  )
}

export default Notif
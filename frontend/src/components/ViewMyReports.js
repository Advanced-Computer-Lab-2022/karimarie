import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from 'react-bootstrap';
import NavbarHomePage from '../S3_components/NavbarHomePage';
import x from "./ViewMyReportsC.module.css"
import {Box} from '@mui/material'

const ViewMyReports = () => {
    const [reports,setReports]=useState()
    const [id,setId]=useState("639b3cb9b925a46e7a60ac97")
    const [gender,isGender]=useState(false);
    const [followUpText,setFollowUpText]=useState('');
    const sendRequest = async () => {
        const res = await axios
          .get(`http://localhost:2000/seeMyReports/${id}`) 
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => {setReports(data.reports)});
       
        
      }, []);
      console.log(reports)
  return (
   <React.Fragment>
    <NavbarHomePage></NavbarHomePage>
    <h2 className={x.title}>Reports</h2>

        <div className={x.wrapper}>

        <div className={x.table}>

        <div className={[x.row, x.header].join(' ')}>
        <div className={x.cell}>
            Course Name
        </div>
        <div className={x.cell}>
            Report Type
        </div>
        <div className={x.cell}>
            Report 
        </div>
        <div className={x.cell}>
            Status
        </div>
        <div className={x.cell}>
            Follow Up
        </div>
        </div>

        {reports&&reports.map((req,i) => (

        <div className={x.row}>
        <div className={x.cell} >
        {req.CourseName}
        </div>
        <div className={x.cell} >
        {req.Type}
        </div>
        <div className={x.cell} >
        {req.Report}
        </div>
        <div className={x.cell} >
        <div className={x.status} style={{"background-color" : req.Status === "Unseen" ? "red" : "Pending" ? "yellow" : "Resolved" ? "green" : "blue"}} >{req.Status}</div>
        </div>
        <div className={x.cell} >
        <button  className={x.b10} onClick={()=>isGender(true)}>FollowUp</button>        </div>
    


        </div>

        ))} 
        </div>
        </div>
        {gender && <div className={x.shadearea}>
            <div class={x.country}>
            <button className={x.bbb} onClick={()=>isGender(false)}><i className={["fa fa-times", x.iconn].join(' ')}aria-hidden="true"></i></button>
        <h3 className={x.r}>Follow Up</h3>
        <div class={x.forms}>
            <Box className={x.reportbox} width="250px">
            <p className={x.pp}>(Message will be sent to admin)</p>
          <textarea placeholder='FollowUp Description maxlength="100"' rows="4" cols="47" maxlength="100"className={x.notess}onChange={(e)=>setFollowUpText(e.target.value)}></textarea>
          <button className={x.b2} onClick={()=>{isGender(false)}}>Submit</button>

            </Box>
  </div>    </div>
            </div>

            }


   </React.Fragment>
  )
}

export default ViewMyReports
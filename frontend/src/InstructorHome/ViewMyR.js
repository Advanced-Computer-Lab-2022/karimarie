import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from 'react-bootstrap';
// import TraineeNavbar from './TraineeNavbar';
import x from "../TraineeHome/ViewMyReportsC.module.css"
import {Box} from '@mui/material'
import { useParams } from 'react-router-dom';
import cc from '../InstructorHome/CreateCourse.module.css'

const ViewMyR = (id) => {
    const [reports,setReports]=useState()
    // const [id,setId]=useState("639b3cb9b925a46e7a60ac97")
    // const id=useParams().id;
    console.log("hey")
    console.log(id.id);
    const [gender,isGender]=useState(false);
    const [gender2,isGender2]=useState(false);

    const [followUpText,setFollowUpText]=useState('');
    const sendRequest = async () => {
        const res = await axios
          .get(`http://localhost:2000/seeMyReports/${id.id}`) 
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => {setReports(data.reports)});
       
        
      }, []);
      const [idd,setIdd]=useState("")
      const [sendmessageC,issendmessage]=useState(false);
      const [sendmessageCC,issendmessageC]=useState(false);

      const foll=async()=>{
        console.log(idd);
        console.log(followUpText);
        const res = await axios
        .post("http://localhost:2000/followUp",{
            id:idd,
            followUp:followUpText
        }) 
        .catch((err) => console.log(err));
        const data = await res.data;
        
      }
    
      const checkfoll=async()=>{
        const res = await axios
        .post("http://localhost:2000/checkfoll",{
            id:idd,
            followUp:followUpText
        }) 
        .catch((err) => console.log(err));
        const data = await res.data;
        if(data.message.localeCompare("no")===0){
            issendmessageC(true)
        }else{
            isGender(true);}
      }
    


  return (
   <React.Fragment>
    {/* <TraineeNavbar></TraineeNavbar> */}
    <div className={cc.moveR}>
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
        <button  className={x.b10} onClick={()=>{setIdd(req._id);checkfoll()}}>FollowUp</button>        </div>
    


        </div>

        ))} 
        </div>
        </div>
        {gender && <div className={x.shadearea}>
            <div class={x.country}>
            <button className={x.bbb} onClick={()=>{isGender(false);}}><i className={["fa fa-times", x.iconn].join(' ')}aria-hidden="true"></i></button>
        <h3 className={x.r}>Follow Up</h3>
        <div class={x.forms}>
            <Box className={x.reportbox} width="250px">
            <p className={x.pp}>(Message will be sent to admin)</p>
          <textarea placeholder='FollowUp Description maxlength="100"' rows="4" cols="47" maxlength="100"className={x.notess}onChange={(e)=>setFollowUpText(e.target.value)}></textarea>
          <button className={x.b2} onClick={()=>{isGender(false);issendmessage(true);foll()}}>Submit</button>

            </Box>
  </div>    </div>
            </div>

            }
            {/* {gender2 && <div className={x.shadearea}>
            <div class={x.country}>
        <h3 className={x.r}>FollowUp Sent Successfully!</h3>
        <button className={x.bbb} onClick={()=>{isGender2(false)}}><i className={["fa fa-times", x.iconn].join(' ')}aria-hidden="true"></i></button>
        <div class={x.forms}>
            <Box className={x.reportboxxx} width="250px" style={{color:" #17cf97"}}>
            <p>The Admin is working hard on resolving your problem and will get back to you shortly!</p>

            </Box>
          </div>    
          </div>
            </div>

            } */}

{sendmessageC && <div className={cc.shadearea}>
         
         <div class={x.country}>
     <h3 className={x.r}>FollowUp Sent Successfully!</h3>
     <button className={x.bbb} onClick={()=>{issendmessage(false)}}><i className={["fa fa-times", x.iconn].join(' ')}aria-hidden="true"></i></button>
     <div class={x.forms}>
         <Box className={x.reportboxxx} width="250px" style={{color:" #17cf97"}}>
         <p>The Admin is working hard on resolving your problem and will get back to you shortly!</p>

         </Box>
       </div>    
       </div>
       </div>}
       {sendmessageCC && <div className={cc.shadearea}>
         <div className={cc.modalcontainerr}>
             <p className={cc.editbiotext2}>A request has been sent before </p>
             <button className={cc.submiteditbutton2} onClick={()=>issendmessageC(false)}>Ok</button>
             
         </div> 
       </div>}

       </div>
   </React.Fragment>
  )
}

export default ViewMyR;
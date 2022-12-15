import React from 'react'
import x from "./Watchh.module.css";
import { useEffect, useState } from "react";

import axios from "axios";

import NavbarHomePage from '../../S3_components/NavbarHomePage';
import { color } from '@mui/system';
import { StepContext } from '@mui/material';

const Watch = () => {
    const [xx,setX]=useState([1,2,3,4]);
    const [course,setCourse]=useState([])
    const [id,setId]=useState('639b49734f35d4c8004accfd')
    const [video,setVideo]=useState();
    const [green,setGreen]=useState(true);
    const [showD,setShowD]=useState('')
    const [text,setText]=useState('')

    //el asamy el habaynha 
    const [title,setTitle]=useState('');
    const [title2,setTitle2]=useState('');
    const [preview,setPreview]=useState('');
    const [descrip,setDescrip]=useState('');
    const sendRequest = async () => {
        const res = await axios
          .get(`http://localhost:2000/getById/${id}`) 
          .catch((err) => console.log(err));
          const data = await res.data;
        console.log("hey");
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => {setCourse(data.course);setTitle2(data.course.title);setPreview(data.course.preview);setDescrip(data.course.description)});
       
        
      }, []);
      const c=()=>{
        console.log("hey");
      }
      console.log(preview);
    return (
   <React.Fragment >
        <NavbarHomePage></NavbarHomePage>
        <div className={x.wholePage}>
          
        <div className={x.left}>
        <h2 className={x.bigTitle}>>{title2}</h2>
        <div className={x.box}>
          <h2 className={x.h}>{title}</h2>
         <div className={x.video}><iframe src={preview} width="710px" height="410px" title="YouTube video" allowfullscreen></iframe></div> 
        </div>
        <div className={x.topnav}>
          <div className={x.xx}>
        <a className={x.active} style={{"background-color" : green ? "#17cf97" : "#1b2430"}} onClick={()=>{setGreen(true)}} >Description</a>
        <a className={x.active} style={{"background-color" : green ? "#1b2430" :"#17cf97" }} onClick={()=>{setGreen(false)}} >Notes</a>
        <a className={x.report} style={{"color" : "white" }} ><p>Report a Problem</p></a>

        </div>
        </div>
        {green ? <div className={x.desc} >{descrip}</div>:<div className={x.notesBox}> <h3 className={x.notesH}>Notes:</h3>
      <textarea rows="10" cols="112" id="message" name="message" className={x.notes }onChange={(e)=>setText(e.target.value)}>{text}</textarea>
      <button className={x.b}>Download Notes</button>
      </div>}
     
       
        </div>

        <section className={x.section}>
    {course.subtitles&&course.subtitles.map((req,i) =>(
                <details className={x.details}>
                <summary className={x.summary}>
                    Lesson {i+1}: {req.title}
                    <div className={x.clockdiv}><i className="fa fa-clock-o fa-xs m" aria-hidden="true"></i> {req.totalHours} hrs</div>
                </summary>
                <p className={x.inside}>
                    <div className={x.gowa}>
                        {/* <ul>
                            <li><div className={x.dli}><p className={x.text}>Hey</p></div></li>
                            <li><div className={x.dli}><p className={x.text}>Hey</p></div></li>
    
                        </ul> */}
                       {/* <div className={x.div1}><button className={x.b}>Hey</button></div>
                       <div className={x.div2}><button className={x.b}>Hey</button></div> */}
                     <div className={x.div1}> <a className={x.a} onClick={()=>{setPreview(req.Video);setTitle(req.title);setDescrip(req.shortDescrip)}} >Start Session</a> </div>
                     
                     <div className={x.div2}> <a className={x.a} onClick={()=>{setGreen(false)}} >Solve Exam</a> </div>
                     </div>
                </p>
            </details>
 ))}
    </section>


</div>
   </React.Fragment>
  )
}

export default Watch
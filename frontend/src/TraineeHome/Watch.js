import React from 'react'
import x from "./Watchh.module.css";
import { useEffect, useState } from "react";

import axios from "axios";
import closeIcon from '../S3_components/closeButton.png'
import { color } from '@mui/system';
import { StepContext } from '@mui/material';
import {Box} from '@mui/material'
import McqQuiz from '../components/Insructor/Quiz/McqQuiz';
import { useParams } from 'react-router-dom';
import TraineeNavbar from './TraineeNavbar';
import ReactPlayer from "react-player"
import YouTube from "react-youtube";
import getVideoId from 'get-video-id';


const Watch = () => {
    const [xx,setX]=useState([1,2,3,4]);
    const [course,setCourse]=useState([])
    const id=useParams().id
    const instructor=useParams().instructor
    const [video,setVideo]=useState();
    const [green,setGreen]=useState(true);
    const [showD,setShowD]=useState('')
    const [text,setText]=useState('')
    const [vid,isVideo]=useState(true);
    //el asamy el habaynha 
    const [title,setTitle]=useState('');
    const [title2,setTitle2]=useState('');
    const [preview,setPreview]=useState('');
    const [descrip,setDescrip]=useState('');
    const [gender,isGender]=useState(false);
    //report part
    const [reportText,setReportText]=useState('');
    const [reportType,setReportType]=useState('')
    //exam
    const [exam,setShowExam]=useState(false);
    const [CourseId,setCourseId]=useState('')
    const [title222,seTitlenum2]=useState()
    const [inst,setinst]=useState('')
    const sendRequest = async () => {
        const res = await axios
          .get(`http://localhost:2000/getById/${id}`) 
          .catch((err) => console.log(err));
          const data = await res.data;
        console.log("hey");
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => {setCourse(data.course);setTitle2(data.course.title);setPreview(getVideoId(data.course.preview));setDescrip(data.course.description)});
        sendReq().then((data)=>setinst(data))
        
      }, []);
      const sendReq=async ()=>{
        const res2 = await axios
                      .get(`http://localhost:2000/instructor/getByid2/${instructor}`)
                      .catch((err) => console.log(err));
        const data=res2.data.inst;
        return data;
      }
      const reportNow=async()=>{
        console.log(reportType);
        const res = await axios
          .post(`http://localhost:2000/reportProblem`,{
            ReportById:localStorage.getItem("token"),
            CourseId:id,
            Type:reportType,
            Report:reportText
          }) 
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
      const downloadMe=()=>{
        console.log(text);
        const element=document.createElement('a');
        const file=new Blob([text],{
          type:"text/plain;charset-utf-8"
        });
        element.href=URL.createObjectURL(file);
        element.download="NewDocument.txt";
        document.body.appendChild(element);
        element.click();
      }
    const callExam=(CourseId)=>{
      console.log(CourseId)
    }
    const [dur,setdur]=useState(0);
    const addP=async()=>{
      
        console.log(id)
        console.log(previewUrl)
        console.log(dur)
        if(dur!=0){
      const res = await axios
          .post(`http://localhost:2000/corpTrainee/addP`,{
            courseID:id,
            traineeID:localStorage.getItem("token"),
            videoID:previewUrl,
            progress:dur
          }) 
          .catch((err) => console.log(err));
    }}
    useEffect(() => {
      addP();
    },[dur]);
    const [previewUrl,setPreviewUrl]=useState("")
   
    const checkElapsedTime = (e) => {
      setdur((e.target.getCurrentTime())/60);
      const currentTime = (e.target.getCurrentTime())/60;
       //addP();
      
    };
  
    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    const [videoUrl, setVideoUrl] = React.useState("");




   
    return (
   <React.Fragment >
        <TraineeNavbar/>
        <div className={x.wholePage}>
          
        <div className={x.left}>
        <h2 className={x.bigTitle}> > {title2}</h2>
        <div className={x.box}>
          <h2 className={x.h}>{title}</h2>
  
       {vid ?  <div className={x.video}>
       {preview&&<YouTube
            videoId={preview.id}
            containerClassName="embed embed-youtube"
            onStateChange={(e) => checkElapsedTime(e)}
            opts={opts}
            
            
          />}
        {/* <iframe src={preview} width="710px" height="410px" title="YouTube video" allowfullscreen></iframe> */}
     {/* <ReactPlayer controls url={preview}/> */}
     
     
        </div>
        :<div className={x.ex}><McqQuiz  CourseId={CourseId} /> </div>}
        {!vid&&<div>hey</div>}
        </div>
        <div className={x.topnav}>
          <div className={x.xx}>
            <div className={x.moveee}>
        <a className={x.active} style={{"background-color" : green ? "#17cf97" : "#1b2430"}} onClick={()=>{setGreen(true)}} >Description</a>
        <a className={x.active} style={{"background-color" : green ? "#1b2430" :"#17cf97" }} onClick={()=>{setGreen(false)}} >Notes</a></div>
        <div className={x.movee}>
        <a className={x.report} style={{"background-color" : gender? "#17cf97": "#1b2430"}} onClick={()=>{window.location.href=`/instprofile/${inst._id}/${localStorage.getItem("userType")}`;isGender(false)}}>By {inst.userName}</a>
        <a className={x.report} style={{"background-color" : gender? "#1b2430": "#17cf97"}} onClick={()=>{isGender(true)}}>Report a Problem</a>
        </div>
        </div>
        </div>
        {green ? <div className={x.desc} >{descrip}</div>:<div className={x.notesBox}> <h3 className={x.notesH}>Notes:</h3>
      <textarea rows="10" cols="112" id="message" name="message" className={x.notes }onChange={(e)=>setText(e.target.value)}>{text}</textarea>
      <button className={x.b} onClick={downloadMe}>Download Notes</button>
      </div>}
      {gender && <div className={x.shadearea}>
            <div class={x.country}>
        <h3 className={x.r}>Report a problem:</h3>
        <button class={x.closeButton} onClick={()=>isGender(false)}>  <img src={closeIcon} width="20"></img></button>
        <div class={x.forms}>
            <Box className={x.reportbox} width="250px">
            <select className={x.select} id="language" onChange={(e) => setReportType(e.target.value)}  >
            <option value="c" selected="selected" hidden><p className={x.c} >Problem Type</p></option>  
            <option className={x.createO}value="Technical">Technical</option>
            <option className={x.createO}value="Financial">Financial</option>
            <option className={x.createO}value="Others">Others</option>
          </select>
          <textarea rows="7" cols="47 " id="message" name="message"placeholder='Problem Description' className={x.notess }onChange={(e)=>setReportText(e.target.value)}></textarea>
          <button className={x.b2} onClick={()=>{reportNow();isGender(false)}}>Report</button>

            </Box>
  </div>    </div>
            </div>

            }
       
        </div>

        <section className={x.section11}>
        <div className={x.showplease}>
    {course.subtitles&&course.subtitles.map((req,i) =>(
                <details className={x.detailsx}>
                <summary className={x.summary11}>
                    Lesson {i+1}: {req.title}
                    <div className={x.clockdiv}><i className="fa fa-clock-o fa-xs m" aria-hidden="true"></i> {req.totalHours} hrs</div>
                </summary>
                <p className={x.inside}>
                    <div className={x.gowa}>
                      {course.subtitles[i].Video.map((video,j)=>(
                     <div className={x.div1}> <a className={x.a} onClick={()=>{setPreview(getVideoId(video));setPreviewUrl(video);setTitle(req.title);setDescrip(req.shortDescrip);isVideo(true)}} >Start Session {j+1}</a> </div>
                      ))}
                     <div className={x.div2}> <a className={x.a} onClick={()=>{setGreen(false);setTitle("Exam "+req.title);callExam(req._id);setCourseId(req._id);isVideo(false); console.log(vid); seTitlenum2(req.title)}} >Solve Exam</a> </div>
                     </div>
                </p>
            </details>
 ))}
<summary className={x.summary112}>
                     
                    <div className={x.clockdiv}> <a  onClick={()=>{setGreen(false);setTitle("Exam "+course.title);callExam(course._id);setCourseId(course._id);isVideo(false); console.log(vid); seTitlenum2(course.title)}}>Final Exam</a></div>
                </summary>
            </div>

    </section>


</div>
   </React.Fragment>
  )
}

export default Watch
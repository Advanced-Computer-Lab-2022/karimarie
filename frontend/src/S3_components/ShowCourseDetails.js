import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import det from './Details.module.css'
// import Rating from '@mui/material/Rating';
import NavbarHomePage from "./NavbarHomePage";
import novideo from "./novideo.png"
import emptystar from "../InstructorHome/emptystar.png"
import quotationIcon from "../InstructorHome/quotation (1).png"
import star from "../S3_components/star.png"
import InstructorNavBar from "../InstructorHome/InstructorNavBar";
import priceTag from "./priceTag.png"
import DefinePromotioncss from "./DefinePromotion.module.css";
import { TextField } from "@mui/material";
import closeIcon from "../S3_components/closeButton.png";
import TraineeNavbar from "../TraineeHome/TraineeNavbar";
import cc from '../InstructorHome/CreateCourse.module.css'
import x from "../TraineeHome/Watchh.module.css";
import {Box} from '@mui/material'
import { Rating } from 'react-simple-star-rating'
import NavbarAdminPage from "../pages/Admin/S3_components/NavbarAdminPage";




const ShowCourseDetails=()=> {
    const id = useParams().id;
    const [showText, setShowText] = useState(false);
    var newPrice = useParams().newPrice;
    // var priceafter=useParams().priceafter;
    newPrice=Math.ceil(newPrice*100)/100;
    const currencyP = useParams().currencyP;
    const type=useParams().type;
    const [etype,setetype]=useState(type)
    
    const type2=useParams().type2;
    const [Course, setCourses] = useState([""]);
    const [subtitles, setSubtitles] = useState([]);
    const [exam,isExamAvailable]=useState(false);
   const [instructorTable,setInstructorTable]=useState('')
    const sendRequest = async () => {
      const res = await axios
        .get(`http://localhost:2000/getByid/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
      // console.log(data)
      return data;
    };
    const sendRequest2 = async () => {
      const res = await axios
        .get(`http://localhost:2000/getExamSol/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };
    const getInstId = async () => {
      if(Course!='' && ready==true){
        isready()
      const res = await axios
        .get(`http://localhost:2000/instructor/getByid2/${Course.instructor}`)
        .catch((err) => console.log(err));
        const data = await res.data;
        // console.log(data)
        return data;
    }};

  
   



    const [freecourse,isfree]=useState(false)
    const [ready,isready]=useState(false);
    const [existDiscount,isexistDiscount]=useState(false);
    var c=new Date();
    const currentTime=c.toJSON().split("T")[0];
    const [prpr,setprpr]=useState('');
    useEffect(() => {
      sendRequest().then((data) => {setCourses(data.course) 
        setSubtitles(data.course.subtitles)
        isready(true);
        if(data.course.discount!=="" && data.course.startTime===currentTime && data.course.discountapplied===false){
            console.log("ho")
            addMyDiscountAuto(data.course.discount,data.course.startTime,data.course.expirationTime)
        }
        if(data.course.expirationTime<currentTime){
            console.log("hi")
            addMyDiscountAuto(data.course.discount,data.course.startTime,data.course.expirationTime)
        }
        if(data.course.discount!=="" && data.course.expirationTime>=currentTime && data.course.startTime<=currentTime){
            isexistDiscount(true)
        }
        if(data.course.discount!=="" && data.course.startTime!==""){
            setprpr((newPrice*(1-((data.course.discount)/100))))
        }
        
      });
     
     sendRequest2().then((data)=>{
      if(data.exam.toString().localeCompare([])===0){
        isExamAvailable(false)
      }else {
        isExamAvailable(true)
      }
     }
    
     )
     if(newPrice===0){
        isfree(true);
     }
    }, []);
    console.log(etype)
    const addMyDiscountAuto = async (x,y,z) => {
        const res = await axios
          .post(`http://localhost:2000/instructor/adddiscount/${id}`, {
            discount: x,
            expirationTime: z,
            startTime: y,
          })
          .catch((err) => console.log(err));
      };
    const [reviewsC,setReviewsC]=useState();
    useEffect(()=>{
       
            getInstId().then((data2)=>setInstructorTable(data2));
            getCourseReviews().then((data3)=>setReviewsC(data3.reviews))

        
    },[Course,ready])
    const [addPromo,isaddPromo]=useState(false);
    const addPromotion=()=>{
        isaddPromo(true);
    }
    const hideAddDiscount = (e) => {
      isaddPromo(false);
    };
  
    const [addDiscount, setAddDiscount] = useState("");
    const [addStartDAte, setStartDate] = useState("");
    const [addExpirationDate, setExpirationDate] = useState("");
  
    const addMyDiscount = async () => {
      const res = await axios
        .post(`http://localhost:2000/instructor/adddiscount/${id}`, {
          discount: addDiscount,
          expirationTime: addExpirationDate,
          startTime: addStartDAte,
        })
        .catch((err) => console.log(err));
    };
    const addedDiscount = (e) => {
      console.log(addDiscount);
      console.log(addExpirationDate);
      console.log(addStartDAte);
     e.preventDefault();
     if(addStartDAte===currentTime){
        console.log("okkkkk")
        console.log(Course.discount)
        setprpr((newPrice*(1-((Course.discount)/100))))
     }
      addMyDiscount();
      setAddDiscount("");
      setStartDate("");
      setExpirationDate("");
      isaddPromo(false);
      window.location.reload();
    };
  
    
   
   

    const getCourseReviews = async () => {
        if(Course!==""){
        const res = await axios
          .get(`http://localhost:2000/getCourseReviews/${Course._id}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          console.log(data)
          return data;
      }};
      const [sendmessageC,issendmessage]=useState(false);
      const [sendmessageCC,issendmessageC]=useState(false);
      const requestAccess= async()=>{
        const res = await axios
        .post(`http://localhost:2000/corpTrainee/reqAA`, {
          courses: Course._id,
         corpId: localStorage.getItem("token")
        })
        .catch((err) => console.log(err));
        const data= res.data;
        console.log(data)
        if(data.message.localeCompare("no")===0){
            issendmessageC(true)
        }else{
        issendmessage(true);}

      }

      const [reportText,setReportText]=useState('');
    const [reportType,setReportType]=useState('')
    const reportNow=async()=>{
      console.log(reportType);
      const res = await axios
        .post(`http://localhost:2000/reportProblem`,{
          ReportById:localStorage.getItem("token"),
          CourseId:Course._id,
          Type:reportType,
          Report:reportText
        }) 
        .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
      const [gender,isGender]=useState(false)
      const reportProblem=()=>{
        isGender(true)
      }
      var x=1;
      const payCourse=()=>{
        console.log("hi")
        getCourses().then((data)=>{
          console.log(data.trainee.courses)
            data.trainee.courses.map((course)=>{
              console.log(Course._id)
              console.log(course)
              if(course.courseID===Course._id){
                console.log("ohhhh")
                x=2;
                settraineeC(true)
              }
            })
            if(x===1){
              window.location.href=`/PayCredit/${Course._id}/${Course.currency}`

            }

        }
        )
       
      }
      const [traineeC,settraineeC]=useState(false)
      const getCourses = async () => {
        const res = await axios
          .get(`http://localhost:2000/corpTrainee/getTrainee/${localStorage.getItem("token")}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
     return(
      <React.Fragment>
       {type2==="Guest" && <NavbarHomePage></NavbarHomePage>}
       {type2==="Instructor" && <InstructorNavBar/>}
       {type2==="CorpTrainee" && <TraineeNavbar/>}
       {type2==="Admin" && <NavbarAdminPage/>}
        { instructorTable && 
        <div>
        <div className={det.wholee} sx={{ minWidth: 275 }}>
        <Typography className={det.tie} variant="h5" component="div" sx={{ fontSize: 30 }}>
          {Course.title}
        </Typography>
        <Typography className={det.tie2} sx={{ fontSize: 25 }}>  {Course.description}</Typography>
        <Typography sx={{ mb: 1.5 }} >
            <div className={det.tagbrown1}>
            {Course.subject}
           </div>
        </Typography>
        <Typography sx={{ mb: 1.5 }}   >
      {type==="Guest" &&  <a href={`/instprofile/${Course.instructor}/${type2}`}>
          Instructor: {instructorTable.inst.userName}
          </a>}
        {type==="Instructor" && <a href={`/profile`}>
          Instructor: {instructorTable.inst.userName}
          </a>}
        </Typography>
        <Typography>
           
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-clock" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
</svg>
<div className={det.al}>{Course.totalHours} Hours</div>
        </Typography>
        <Typography variant="body2">
           <Rating size="25" className={det.readOnlye} allowFraction="true" initialValue={Course.rating} precision={0.5} readonly="true" />
           <br />
         
        </Typography>
        <div>
        {type==="Instructor" &&  <button class={det.buttonAee} onClick={reportProblem}>Report A Problem</button>}
        </div>

      
     


    </div>
    <div className={det.previewe}>
        <iframe className={det.vide} src={Course.preview} title="YouTube video" allowfullscreen></iframe><br></br>
        <Typography className={det.priceX} sx={{ mb: 1.5 }} >
         {type2!=="CorpTrainee"&& existDiscount===false && freecourse===false && <div>Price:  {newPrice}  {currencyP}</div>}
         {type2!=="CorpTrainee"&& freecourse===true && <div>FREE</div>}
         {type2!=="CorpTrainee"&& existDiscount===true &&  freecourse===false &&<div> <div >Price: <span className={det.styleP}>{newPrice}  {currencyP}</span> {prpr} {currencyP} 
         </div>
        <span className={det.startD}>Start Date: {Course.startTime} End Date:{Course.expirationTime}</span> 
         </div>}
        </Typography>
       
        {type==="Guest" && type2==="Guest" && <div><button class={det.buttonAe}  onClick={()=>window.location.href="/signup"}>Buy Now</button><br></br></div>}
        {type==="Instructor" &&  <button class={det.buttonAe} onClick={addPromotion}>Add Promotion</button>}
        {type==="Guest" && type2==="CorpTrainee" && <button class={det.buttonAe} onClick={requestAccess}>Request Access</button>}
        {type2==="Trainee" && <button class={det.buttonAe} onClick={payCourse}>Buy Now</button>}

        </div>
  
<div className={det.main9e}>
<h2 className={det.titlee}>Subtitles</h2>
<section className={det.sectione}>
    {Course.subtitles&&Course.subtitles.map((subtitles,i) =>(
                <details className={det.detailse}>
                <summary className={det.summarye}>
                {subtitles.title}
                </summary>
                <p className={det.insidee}>
                {Course.subtitles[i].Video.map((video,j)=>(
                 <div>
                 {type==="Instructor" && <div><iframe src={video} title="YouTube video" allowfullscreen></iframe><br></br></div>}
                 {type2==="Admin" && <div><iframe src={video} title="YouTube video" allowfullscreen></iframe><br></br></div>}
               {type==="Guest" && type2!=="CorpTrainee" && freecourse===true && <div><iframe src={video} title="YouTube video" allowfullscreen></iframe><br></br></div>}
               {type==="Guest" && type2==="CorpTrainee" && freecourse===true && <img src={novideo} alt="card__image" class={det.novideo} width="40"></img>}
               {type==="Guest"&& type2!=="Admin" && freecourse===false && <img src={novideo} alt="card__image" class={det.novideo} width="40"></img>}
                </div>
                ))}
              
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-clock" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
</svg>
<div className={det.al2}>  {subtitles.totalHours} Hours<br></br></div>
                        Descripton: {subtitles.shortDescrip}<br></br>
                        {/* <button class={det.buttonAe} role="button">Solve Exam</button> */}
                </p>
            </details>
 ))}
    </section>

</div>
{reviewsC && <div className={det.CourseReviews}>
    <div className={det.rattt}>
        {reviewsC.length===0?  <div><img src={emptystar} alt="card__image" class={det.starimage1} width="40"/></div>: <div><img src={star} alt="card__image" class={det.starimage1} width="40"/></div>}
        {reviewsC.length===0?<p className={det.noo}>No Ratings Yet.</p> : <p>{Course.rating} course rating . {reviewsC.length} ratings</p>}
    </div>
    {reviewsC.map((review)=>(
            <div className={det.contR}>
            <Rating
            readonly="true"
            allowFraction="true"
            size="25"
            className={det.rating}
            initialValue={review.rating}></Rating>
            <div className={det.move}>
            <p className={det.name}>{review.userName} </p>
            </div>
            <p className={det.review}>{review.description}
             </p>
             <img className={det.quot1} src={quotationIcon}></img>
             </div>
        ))}
</div>} {gender && 
<div className={det.repo0}>
<div className={det.shadeareaa}>
            <div class={det.countryy}>
        <h3 className={x.r}>Report a problem:</h3>
        <button class={det.closeButtonn} onClick={()=>isGender(false)}>  <img src={closeIcon} width="20"></img></button>
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
            </div>
            }
{addPromo && <div className={DefinePromotioncss.shadearea}>
          <div className={DefinePromotioncss.modalcontainer}>
            <p className={DefinePromotioncss.AddDiscounttext}>
              Add Your Discount
            </p>
            <form
              className={DefinePromotioncss.DiscountForm}
            >
              <div className={DefinePromotioncss.textFields}>
                <TextField
                  required
                  type="number"
                  className={DefinePromotioncss.addDiscountField}
                  value={addDiscount}
                  placeholder={"Type Your Discount Percentage here"}
                  onChange={(e) => setAddDiscount(e.target.value)}
                ></TextField>
                 <TextField
                  required
                  type="text"
                  className={DefinePromotioncss.addStartDateField}
                  value={addStartDAte}
                  placeholder={"Type Your Start Date in YYYY-MM-DD"}
                  onChange={(e) => setStartDate(e.target.value)}
                 ></TextField>
                 <TextField
                   required
                   type="text"
                   className={DefinePromotioncss.addExpiryDateField}
                   value={addExpirationDate}
                   placeholder={"Type Your Expiry Date in YYY-MM-DD"}
                   onChange={(e) => setExpirationDate(e.target.value)}
                 ></TextField> 
              </div>

              <button
                className={DefinePromotioncss.submitadddiscountbutton}
                onClick={addedDiscount}
              >
                Add
              </button>
            </form>
            <button
              onClick={hideAddDiscount}
              className={DefinePromotioncss.closepopup}
            >
              <img src={closeIcon}></img>
            </button>
          </div>
        </div>}

       {sendmessageC && <div className={cc.shadearea}>
            <div className={cc.modalcontainerr}>
                <p className={cc.editbiotext2}>Request was sent successfully </p>
                <button className={cc.submiteditbutton2} onClick={()=>issendmessage(false)}>Ok</button>
                
            </div> 
          </div>}
          {sendmessageCC && <div className={cc.shadearea}>
            <div className={cc.modalcontainerr}>
                <p className={cc.editbiotext2}>A request has been sent before </p>
                <button className={cc.submiteditbutton2} onClick={()=>issendmessageC(false)}>Ok</button>
                
            </div> 
          </div>}
          {traineeC && <div className={cc.shadearea}>
            <div className={cc.modalcontainerr}>
                <p className={cc.editbiotext2}>You have already purchased this course. </p>
                <button className={cc.submiteditbutton2} onClick={()=>settraineeC(false)}>Ok</button>
                
            </div> 
          </div>}

         
</div>}
</React.Fragment>
     )
}
export default ShowCourseDetails;
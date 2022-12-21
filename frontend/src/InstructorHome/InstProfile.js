import React from 'react'
import inst from "./InstProfile.module.css"
import InstructorNavBar from './InstructorNavBar'
import { Rating } from '@mui/material'
import editIcon from "./editIcon.png"
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import closeIcon from "../S3_components/closeButton.png"
import c from "../S3_components/CourseCard.module.css"
import ReactStars from 'react-stars'
import priceTag from "../S3_components/priceTag.png"
import axios from "axios"
import SearchCourse from '../components/SearchCourse'
import ViewMyCourses from './ViewMyCourses'
import NavbarStyles from "../S3_components/NavbarHomePage.module.css"
import language from "../S3_components/language.png"
import closeButton from "../S3_components/closeButton.png"
import closeWhite from "../S3_components/closeWhite.png"
import filterIcon from "../S3_components/filterIcon.png"
import Reviews from './Reviews'
import r from "./Reviews.module.css"
import InstSideBar from './InstSideBar'
import Footer from "../S3_components/Footer"
import det from "../S3_components/Details.module.css"
import {Box} from '@mui/material'
import emptystar from "../InstructorHome/emptystar.png"
import quotationIcon from "../InstructorHome/quotation (1).png"
import star from "../S3_components/star.png"
import x from "../TraineeHome/Watchh.module.css";
import InstBalancePage from './InstBalancePage'
import error from "../InstructorHome/error.png"


const InstProfile = () => {
  const [access,hasaccess]=useState(false)
  const [datas,setdata]=useState("")
  const grantAccess = async () => {
      console.log(localStorage.getItem("token"))
      if(localStorage.getItem("token")===""){
          console.log("hi")
          hasaccess(false)
      }else {
      const res = await axios
        .get(`http://localhost:2000/requireAuth/${localStorage.getItem("token")}`)
        .catch((err) => console.log(err));
        const data = await res.data;
        return data;}
    };
    useEffect(() => {
      if(localStorage.getItem("token")!==""){
          grantAccess().then((data)=>{setdata(data.message)
          if(data.message==="Inst"){
              hasaccess(true)
          }
          else {
              hasaccess(false)
          }
      });
    }}, []);

    const[Edit,isShowEdit]=useState(false);
    const[Password,isShowPassword]=useState(false);
    const[Email,isShowEmail]=useState(false);

    const showEdit=(e)=>{
        console.log("hi")
       isShowEdit(true);
    }
    const showEmail=(e)=>{
        isShowEmail(true);
     }
     const showRatings=(e)=>{
        isShowEmail(true);
     }
    const showPassword=(e)=>{
        isShowPassword(true);
     }
     const hideEdit=(e)=>{
        isShowEdit(false);
        isShowEmail(false);
        isReviews(false)

     }
     const hidePass=(e)=>{
        isShowPassword(false);
        issendmessage(false)
        setnewpassword("")
        issendmessage2(false);
        setconfirmpassword("")
     }
     const [editBio,setEditBio]=useState('');
     const [editEmail,setEditEmail]=useState('');
         const editBiograpgy = async () => {
         const decodeID=String(localStorage.getItem("token"))
         const res = await axios
         .post(`http://localhost:2000/instructor/editbio/${decodeID}`, {
           biography : editBio
         })
         .catch((err) => console.log(err));
     
       };
 
       const editMyEmail = async () => {
         const res = await axios
         .post(`http://localhost:2000/instructor/editemail/${localStorage.getItem("token")}`, {
           email : editEmail
         })
         .catch((err) => console.log(err));
     
       };
       const changeBio=(e)=>{
        editBiograpgy();
        isShowEdit(false);
        setEditBio('')
        window.location.href="/profile"
        e.preventDefault();
     }
      const changeEmail= ()=>{
         console.log(editEmail)
         editMyEmail()
         setEditEmail('')
         window.location.href="/profile"
         isShowEmail(false)
        
      }
    const [Instructor,setInstructor]=useState("");
    const [rating,setRating]=useState("");
    const getInstructor = async () => {
        if(localStorage.getItem("token")!==''){
        const res = await axios
          .get(`http://localhost:2000/instructor/getByid/${localStorage.getItem("token")}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      }};
      useEffect(() => {
        getInstructor().then((data) => {setInstructor(data.inst)
            console.log(data.inst.rating)
            if(data.inst.rating===undefined){
                setRating(0)
              }else{
                setRating(Math.ceil(data.inst.rating*100)/100)
              }
              getInstReviews().then((data2)=>setReviews(data2.reviews))
        });
      }, []);
    const [coursesInst, setCourses] = useState([]);
    const [courselength,setCourselength]=useState(0);
    const [showCourse,setShowCourse]=useState("Start")
    const getCourses = async () => {
        const res = await axios
          .get(`http://localhost:2000/instructor/instCourses/${localStorage.getItem("token")}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
      useEffect(() => {
        getCourses().then((data) => {setCourses(data)
        if(data.length!==0){
            setCourselength(data.length)
        }});
      }, []);
      const [search,setSearch]=useState('');
      const [searchAfter,setSearchAfter]=useState('');
      const SearchCourses = async () => {
        const res = await axios
        .get(`http://localhost:2000/instructor/searchTitle/${localStorage.getItem("token")}/${search}`)
        .catch((err) => console.log(err));
        const data = await res.data;
        return data;
      };
      const searchForCourse=()=>{
        if(search===""){
            setShowCourse("Start")
            setCourselength(coursesInst.length)
        }else{
        SearchCourses().then((data)=>{setSearchAfter(data) 
            setShowCourse("Search")
            setSearch('')
            isClear(true)
            setCourselength(0)
            if(data.length!==0){
                setCourselength(data.length)
            }
        });}
      }
      const [showClearB,isClear]=useState(false)
      const [showfilter,isShowFilter]=useState(false)
      const [price,setPrice]=useState();
      const [subjectList, setSubjectList] = useState([]);//list of subjects
      const [filterResult,setFilterResult]=useState('');
      const currencyFilter=localStorage.getItem("currency");
      const getSubjects = async () => {
        const res = await axios
          .get("http://localhost:2000/subjects")
          .catch((err) => console.log(err));
          const data = await res.data;
    
          return data;
      };
      useEffect(() => {
        getSubjects().then((data) => setSubjectList(data.subjects));
        
      }, []);
      const handleSubject = (event) =>{
        setFilterResult(event.target.value);
      
    }
      const handleFilter=()=>{
        isShowFilter(true)
      }

      const postFilterAll = async () => {
          const res = await axios

          .post(`http://localhost:2000/instructor/postFilterInstructor/${localStorage.getItem("token")}`, {
            price:price,
            currency:currencyFilter,
            subject:filterResult,
          })
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
        
        };
      const handleFilterAfter=()=>{
        console.log(filterResult)
       if(price===undefined && filterResult===""){
        setShowCourse("Start")
       isShowFilter(false)
       }else {
        postFilterAll()
        .then((data=>{
            setSearchAfter(data.priceList)
            setShowCourse("Search")
            isClear(true)
            isShowFilter(false)
            setPrice("")
            setFilterResult("")
            setCourselength(data.priceList.length)
        }));
       }
      }
      const handleClearNavigate=()=>{
        setShowCourse("Start")
        getCourses().then((data) => {setCourses(data)
            if(data.length!==0){
                setCourselength(data.length)
            }});
            isClear(false)
        
      }
      const [Reviews1,isReviews]=useState(false);
      const [reviewsInst,setReviews]=useState("")
     
      const handleClose=()=>{
        isReviews(false);
      }
      const getInstReviews = async () => {
        
        const res = await axios
          .get(`http://localhost:2000/instructor/getInstructorReviews/${localStorage.getItem("token")}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          console.log(data)
          return data;
      };
      const getReviews=()=>{
        // isReviews(true);
        
      }
      const [newpassword,setnewpassword]=useState('');
      const [confirmpassword,setconfirmpassword]=useState('');
      const editpassword = async () => {
        const decodeID=String(localStorage.getItem("token"))
        const res = await axios
        .post(`http://localhost:2000/instructor/editpassword/${decodeID}`, {
          password : newpassword
        })
        .catch((err) => console.log(err));
    
      };
      const [sendmessage,issendmessage]=useState(false)
      const [sendmessage2,issendmessage2]=useState(false)
      const changePassword=()=>{
        if(newpassword!==confirmpassword){
            issendmessage(true);
            issendmessage2(false);
        }else if(newpassword.length<7){
          issendmessage2(true);
          issendmessage(false)
        }
        else {
            issendmessage(false)
            issendmessage2(false)
            hidePass(false);
            editpassword();
        }
        

      }
      const[passwordType,setPasswordType]=useState("password")
      const togglePassword =()=>{
       if(passwordType==="password")
       {
        setPasswordType("text")
        return;
       }
       setPasswordType("password")
     }
     const[passwordType1,setPasswordType1]=useState("password")
     const togglePassword1 =()=>{
      if(passwordType1==="password")
      {
       setPasswordType1("text")
       return;
      }
      setPasswordType1("password")
    }
    const[page,isshowPage]=useState(true)
    const[balance,isShowbalance]=useState(false)
    const renderBalancePage=(e)=>{
      isShowbalance(true);
      isshowPage(false);
    console.log(Instructor.balance)}
    
     
  
    return (
      <React.Fragment>
        {access &&
        <div className={inst.allall}>
          
            <InstructorNavBar></InstructorNavBar>
            {page&& 
            <div className={inst.all}>
            <p className={inst.firsttitle}>INSTRUCTOR</p>
            <p className={inst.name}>{Instructor.userName}</p>
            <p className={inst.shortdescription}>CEO of TheCodex.me - Teaching 500,000+ Students how to code</p>
            <p className={inst.emaill}>{Instructor.email}</p>
            <p className={inst.totalstudents}>Total Students</p>
            <p className={inst.totalstudentsnumber}>1,200</p>
            <p className={inst.totalreviews}>Total Reviews</p>
          <p className={inst.totalreviewsnumber}>{reviewsInst.length}</p>
            <p className={inst.averagerating}>Average Rating</p>
            {Instructor && <p className={inst.averageratingnumber}>{rating}</p>}
            <p className={inst.aboutme}>About Me</p>
            <p className={inst.aboutmetext}>{Instructor.biography}</p>
          <button className={inst.editbutton}onClick={showEdit}>
            <img src={editIcon} className={inst.editicon} width="24"></img>
          </button>
          <div>
            
           
           </div>
           
         
         {showCourse.localeCompare("Start")===0 && 
         <div className={inst.ViewCourses2}>
              { showfilter && 
          <div className={inst.FFF}> 
          <div className={inst.shadearea2}>
                  <div className={NavbarStyles.modalcontainer}>
          <div className={NavbarStyles.rectangle}> <h4 className={NavbarStyles.rectangleText}>Filter our Courses </h4>       
          </div>
          <h6 className={NavbarStyles.priceText}>Price Filter in :{currencyFilter} </h6>
          <div className={NavbarStyles.pricefield}>
          <TextField
          type="number"
          InputProps={{
            inputProps: { 
              min: 0
            }
          }}
          onChange={(e) => setPrice(e.target.value)} 
          value={price}
          ></TextField>
          <div className={NavbarStyles.formcontrol} >
         <select value={filterResult} onChange={handleSubject}>
              <option value="">Choose A Subject</option>
        {subjectList.map(subject => (
              <option value={subject.title} key={subject._id} >{subject.title}</option>
              ))
              }
          </select> 
          </div>
          <div className={NavbarStyles.close}>
          <button onClick={()=>isShowFilter(false)}><img src={closeWhite} alt="card__image" width="24"></img></button>
          </div>
          </div>
          <button className={NavbarStyles.submitbutton}
          onClick={handleFilterAfter}>Submit</button>
                      </div>
                      
              </div>
              </div>
            }

            <div className={inst.wrap}>
            <div className={inst.searchC}>
                <div className={inst.wrap2}>
                <input type="text" className={inst.searchTerm} value={search}  onChange={(e) => setSearch(e.target.value)} placeholder="Search your Courses"/>
                <button type="submit" onClick={searchForCourse} class={inst.searchButtonC}>
                    <i class="fa fa-search"></i>
                </button>
                
                <button type="submit" onClick={handleFilter} class={inst.filterButtonC}>
                <i class="fa fa-filter"></i></button></div>
                <div className={inst.please}>
                {showClearB && <button class={inst.button7} onClick={handleClearNavigate}>Clear Filter</button>}
                </div>
              
           
            </div>
            </div>
            <p>My Courses ({courselength})</p>
            {coursesInst && coursesInst.map((courses)=><ViewMyCourses
         id={courses._id}
         title={courses.title}
        //  totalHours={courses.totalHours}
         rating={courses.rating}
         price={courses.originalPrice}
         priceafter={courses.price}
         Instructor={Instructor.userName}
         currency={courses.currency}
         subject={courses.subject}
         type="Instructor"
         type2="Instructor"
        />
           )}
           
        </div>}
       
        {showCourse==="Search" && <div className={inst.ViewCourses2}>
        { showfilter && 
          <div className={inst.FFF}> 
          <div className={inst.shadearea2}>
                  <div className={NavbarStyles.modalcontainer}>
          <div className={NavbarStyles.rectangle}> <h4 className={NavbarStyles.rectangleText}>Filter our Courses </h4>       
          </div>
          <h6 className={NavbarStyles.priceText}>Price Filter in :{currencyFilter} </h6>
          <div className={NavbarStyles.pricefield}>
          <TextField
          type="number"
          InputProps={{
            inputProps: { 
              min: 0
            }
          }}
          onChange={(e) => setPrice(e.target.value)} 
          value={price}
          ></TextField>
          <div className={NavbarStyles.formcontrol} >
         <select value={filterResult} onChange={handleSubject}>
              <option value="">Choose A Subject</option>
        {subjectList.map(subject => (
              <option value={subject.title} key={subject._id} >{subject.title}</option>
              ))
              }
          </select> 
          </div>
          <div className={NavbarStyles.close}>
          <button onClick={()=>isShowFilter(false)}><img src={closeWhite} alt="card__image" width="24"></img></button>
          </div>
          </div>
          <button className={NavbarStyles.submitbutton}
          onClick={handleFilterAfter}>Submit</button>
                      </div>
                      
              </div>
              </div>
            }

            <div className={inst.wrap}>

            <div className={inst.searchC}>
                <div className={inst.wrap2}>
                <input type="text" className={inst.searchTerm} value={search}  onChange={(e) => setSearch(e.target.value)} placeholder="Search your Courses"/>
                <button type="submit" onClick={searchForCourse} class={inst.searchButtonC}>
                    <i class="fa fa-search"></i>
                </button>
                <button type="submit" onClick={handleFilter} class={inst.filterButtonC}>
                <i class="fa fa-filter"></i></button>
                </div>
                <div className={inst.please}>
                {showClearB && <button class={inst.button7} onClick={handleClearNavigate}>Clear Filter</button>}
                </div>

            </div>
            </div>
            <p>My Courses ({courselength})</p>
            {searchAfter && searchAfter.map((courses)=><ViewMyCourses
         id={courses._id}
         title={courses.title}
        //  totalHours={courses.totalHours}
         rating={courses.rating}
         price={courses.originalPrice}
         Instructor={Instructor.userName}
         priceafter={courses.price}
         currency={courses.currency}
         subject={courses.subject}
         type="Instructor"
         type2="Instructor"
        />
           )}
        </div>}
        <div className={inst.instrating}>
        {reviewsInst && <div className={det.CourseReviews}>
    <div className={det.rattt}>
        {reviewsInst.length===0?  <div><img src={emptystar} alt="card__image" class={det.starimage1} width="40"/></div>: <div><img src={star} alt="card__image" class={det.starimage1} width="40"/></div>}
        {reviewsInst.length===0?<p className={det.noo}>No Ratings Yet.</p> : <p>{Instructor.rating} course rating . {reviewsInst.length} ratings</p>}
    </div>
    {reviewsInst.map((review)=>(
            <div className={det.contR}>
            <Rating
            readOnly
            className={det.rating}
            value={review.rating}></Rating>
            <div className={det.move}>
            <p className={det.name}>{review.userName} </p>
            </div>
            <p className={det.review}>{review.description}
             </p>
             <img className={det.quot1} src={quotationIcon}></img>
             </div>
        ))}
</div>}
</div>

            <img src="https://source.unsplash.com/600x400/?food" alt="card__image" className={inst.image} width="600"/>    
            <button className={inst.changepassword} onClick={showPassword}>Change Password</button>
            <button className={inst.changeEmail} onClick={showEmail}>Change My Email</button>
            <button className={inst.ViewRatings} onClick={renderBalancePage}>View My Balance</button>
            {Edit&& <div className={inst.shadearea}> 
            <div className={inst.modalcontainer}>
                <p className={inst.editbiotext}>Edit Your Bio</p>
                <textarea className={inst.edittextfield} value={editBio} onChange={(e) => setEditBio(e.target.value)}>
                </textarea>
                <button className={inst.submiteditbutton} onClick={changeBio}>Submit</button>
                <button onClick={hideEdit} className={inst.closeedit}  ><img src={closeIcon} ></img></button>
            </div>
            </div>
            }
           
            {Email&& <div className={inst.shadearea}> 
            <div className={inst.modalcontainer}>
                <p className={inst.editemailtext}>Edit Your Email</p>
                <form onSubmit={changeEmail}>
                <TextField   required type="email" className={inst.editemailfield} value={editEmail} placeholder={"Type Your Email"} onChange={(e) => setEditEmail(e.target.value)}>
                </TextField>
                <button className={inst.submiteditbutton}  type="submit" >Submit</button>
                </form>
                <button onClick={hideEdit} className={inst.closeedit}  ><img src={closeIcon} ></img></button>
            </div>
            </div>
            }
            {Password && <div className={inst.shadearea}> 
            <div className={inst.modalcontainer}>
            <p className={inst.changepass}>Change Your Password</p>
            <p className={inst.newpass}>New Password:</p>
            <TextField className={inst.passtextfield1} type={passwordType}  required value={newpassword} onChange={(e) => setnewpassword(e.target.value)} ></TextField>
            
            <p className={inst.confirmpass}>Confirm Password:</p>
            <TextField className={inst.passtextfield2} type={passwordType1} required value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} ></TextField>
          {sendmessage && <div className={inst.message2}><p className={inst.message}>Those passwords didn't match. Try Again </p></div>}
            {sendmessage2 && <div className={inst.message}><p>Your password should be at least 8 characters</p></div>}
            <button className={inst.submitpassbutton} onClick={changePassword}>Submit</button>
            <button onClick={hidePass} className={inst.closeedit2} ><img src={closeIcon} ></img></button>
            <div className={inst.see2}>
            <button  onClick={togglePassword}>
          { passwordType==="password"? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
</svg> :<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg> }
          </button>
          </div>
          <div className={inst.see1}>
            <button  onClick={togglePassword1}>
          { passwordType1==="password"? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
</svg> :<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg> }
          </button>
          </div>
                </div>
                
                </div>
                
                }
                 
                </div>}
                {balance  && <InstBalancePage
              instbalance={Instructor.balance}/>}
             
        </div>}
        {!access && <div>
            <img src={error} width="64"></img> Access not granted
            </div>}
         </React.Fragment>

    )
}

export default InstProfile
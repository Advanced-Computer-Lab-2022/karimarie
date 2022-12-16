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

const InstProfile = () => {
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
          return data;
      };
      const getReviews=()=>{
        isReviews(true);
        
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
     
  
    return (
      <React.Fragment>
        <div className={inst.allall}>
          
            <InstructorNavBar></InstructorNavBar>
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
         price={courses.price}
         Instructor={Instructor.userName}
         currency={courses.currency}
         subject={courses.subject}
         type="Instructor"
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
         price={courses.price}
         Instructor={Instructor.userName}
         currency={courses.currency}
         subject={courses.subject}
        />
           )}
        </div>}
        <div className={inst.ViewRatingsi}>
          {Reviews1 && reviewsInst &&
           reviewsInst.map((review)=>
            <Reviews review={review.description} rating={review.rating}/>
          )}
                   {Reviews1 && <button onClick={hideEdit} className={inst.closeeditXX}  ><img src={closeIcon} ></img></button>}
           </div>
            <img src="https://source.unsplash.com/600x400/?food" alt="card__image" className={inst.image} width="600"/>    
            <button className={inst.changepassword} onClick={showPassword}>Change Password</button>
            <button className={inst.changeEmail} onClick={showEmail}>Change My Email</button>
            <button className={inst.ViewRatings} onClick={getReviews}>View My Reviews</button>
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
            <TextField className={inst.passtextfield1} type="password"  required value={newpassword} onChange={(e) => setnewpassword(e.target.value)} ></TextField>
            
            <p className={inst.confirmpass}>Confirm Password:</p>
            <TextField className={inst.passtextfield2} type="password" required value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} ></TextField>
          {sendmessage && <div className={inst.message2}><p className={inst.message}>Those passwords didn't match. Try Again </p></div>}
            {sendmessage2 && <div className={inst.message}><p>Your password should be at least 8 characters</p></div>}
            <button className={inst.submitpassbutton} onClick={changePassword}>Submit</button>
            <button onClick={hidePass} className={inst.closeedit2} ><img src={closeIcon} ></img></button>

                </div>
                </div>
                }
                 
                </div>
             
        </div>
         </React.Fragment>

    )
}

export default InstProfile
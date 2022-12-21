import { useState } from 'react'
import { Typography } from '@mui/material'
import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import cc from './CreateCourse.module.css'
import Footer from "../S3_components/Footer";
import TextField from '@mui/material/TextField';
import {Box} from '@mui/material'
import st from './ExamStyle.module.css'
import inst from "./InstProfile.module.css"
import error from "../InstructorHome/error.png"



const CreateCourseNew = () => {
 

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [totalHours, setTotalHours] = useState('')
  const [resultingSubject, setResultingSubject] = useState('') //egabt el walad
  const [subject, setSubject] = useState([]) //loop 3ala db el subjects
  const [description, setDescription] = useState('')
  const [subtitles, setSubtitles] = useState('')
  const [error, setError] = useState(null)
  const [currency, setCurrency] = useState('EGP')
  const [preview,setPreview]=useState('')
const [showCreate,isCreate]=useState(true);
const [showExam,isExam]=useState(false);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:2000/subjects")
      .catch((err) => console.log(err));
      const data = await res.data;
      return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setSubject(data.subjects));
    
  }, []);
  const handleChange = (event) =>{
    //console.log(event.target.value);
    setResultingSubject(event.target.value);
}
  const sendRequest2 = async () => {
    const res = await axios
      .post("http://localhost:2000/instructor/addCourse", {
        title: title,
        price:price,
        totalHours:totalHours,
        subject:resultingSubject,
        description:description,
        instructor:localStorage.getItem("token"),
        subtitles:inputList,
        currency:currency,
        preview:preview,
        originalPrice:price
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const [nbExams,setnbExams]=useState('')
  const [coursee,setCourse]=useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest2().then(data=>{setCourse(data.course)
    getS(data.course.subtitles)});
    setnbExams(inputList.length+1);
    setTitle("");
    setPrice('');
    setTotalHours('');
    setResultingSubject("")
    setDescription('');
    setCurrency('')
    setPreview('')
    isCreate(false);
    isExam(true);
    setinputList([{ title:'', Video:'',totalHours:'',shortDescrip:''}])
  };
  const [inputList3, setinputList3]= useState([{Video:''}])
  const [inputList, setinputList]= useState([{ title:'', Video:[],totalHours:'',shortDescrip:''}]);
  const handleinputchange=(e, index,index2)=>{
     const {name, value}= e.target;
     const list= [...inputList];
    console.log(index)
    console.log(index2)
    if(name=="Video"){
      console.log("hi")
      list[index2][name][index]=value
    }
    else {
      list[index][name]= value;

    }
    setinputList(list);

  }
  const handleremove= index=>{
    const list=[...inputList];
    list.splice(index,1);
    setinputList(list);
  }

  const handleaddclick=()=>{ 
    setinputList([...inputList, { title:'', Video:[],totalHours:'',shortDescrip:''}]);
  }
      // const handleinputchange3 =(e, index)=>{
      //   console.log(index)
      //   const {name, value}= e.target;
      //   const list= [...inputList3];
      //   list[index]= value;
      //   setinputList3(list);
      //   console.log(inputList[0].Video.concat(inputList3))
      // }
      console.log(inputList)
      const handleremove3= index=>{
        const list=[...inputList3];
        list.splice(index,1);
        setinputList3(list);
      }
      const handleaddclick3=()=>{ 
        setinputList3([...inputList3, { Video:''}]);
      }
      // console.log(inputList)
  const [countries,setCountries]=useState('');
  const getCountires = async () => {
    const res = await axios
      .get("https://restcountries.com/v2/all")
      .catch((err) => console.log(err));
      const data = await res.data;
    const myobj= JSON.stringify(data);
    const myObj1 = JSON.parse(myobj);
    var answer = myObj1.filter((count) => (count.currencies !== undefined))  
  answer=answer.map(x=>x.currencies[0].code)
  answer=[...new Set(answer)]
      return answer;
  };
  useEffect(()=>{
  getCountires().then((data) => setCountries(data))
 
    
  },[]);
  const [value,setValue]=useState('');
  const ChangeHandler=(e)=>{
    setCurrency(e.target.value);
      }  

      const [CourseId, setCourseId] = useState('')
      const [QuizNumber, setQuizNo] = useState('')
      const [questions, setQuestion] = useState('')
      const [choice, setChoice]= useState('')
      const [selected, setselected]= useState('')
      const [times,setTimes]=useState(0);
      const [getSubtitles,getS]=useState();
      const handleSubmit2 = (e) => {
        e.preventDefault();
          createExam();
          setTimes(times+1);
        setCourseId('')
        setQuizNo('')
      };
      const handleSubmit3 = (e) => {
        e.preventDefault();
          createExam2();
        setTimes(times+1);
        setCourseId('')
        setQuizNo('')
        
      };
      console.log(nbExams)
      const createExam = async () => {
        const res = await axios
          .post("http://localhost:2000/instructor/createExam", {
            CourseId: coursee._id,
            QuizNumber:QuizNumber,
            Content: inputList2
          })
          .catch((err) => console.log(err)); 
    };
    const createExam2 = async () => {
        const res = await axios
          .post("http://localhost:2000/instructor/createExam", {
            CourseId:getSubtitles[times-1]._id,
            QuizNumber:QuizNumber,
            Content: inputList2
          })
          .catch((err) => console.log(err)); 
    };
    const [inputList2, setinputList2]= useState([{ question:'', choice1:'',choice2:'',choice3:'',choice4:'',correctAns:''}]);
    const handleinputchange2=(e, index)=>{
      const {name, value}= e.target;
      const list= [...inputList2];
      list[index][name]= value;
      setinputList2(list);
  
    }
    const handleremove2= index=>{
      const list=[...inputList2];
      list.splice(index,1);
      setinputList2(list);
    }
  
    const handleaddclick2=()=>{ 
      setinputList2([...inputList2, { question:'', choice1:'',choice2:'',choice3:'',choice4:'',correctAns:''}]);
    }
    const [showMessage,isShowMessage]=useState(false);
    useEffect(() => {
        if(times===nbExams){
            isShowMessage(true);
        }
        
      }, []);

  return (
    <React.Fragment>
      
       <div>
       {showCreate && <div className={cc.allC}>
        <form className={cc.create} onSubmit={handleSubmit}>
        <h1 className="mt-3 mb-4 fw-bold fs-" >Add a New Course</h1>
        <div className={cc.part1}>
      <label>Title:</label>
       <input type="text" placeholder='Enter Course Title' required className={cc.box} id="outlined-basic"  fullWidth variant="outlined" onChange={(e) => setTitle(e.target.value)} 
       value={title}/>
        <div>&nbsp;</div>
      <label>Preview:</label>
      <input type="text" placeholder='Enter Course Preview'  required className={cc.box} id="outlined-basic"  fullWidth variant="outlined" onChange={(e) => setPreview(e.target.value)} 
       value={preview}/>
      <div>&nbsp;</div>
      <label>Price:</label>
      <input placeholder='Enter Course Price'  min="0" required className={cc.box} 
        type="number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
      />
      <div>&nbsp;</div>

<div class={cc.curr}>
<Box >
            <select className={cc.makan} value={currency} onChange={ChangeHandler} placeholder="Select">
            <option > Currency </option>
            {countries &&
    countries.map( (x) => 
      <option > {x}</option> )
  }</select>
            </Box>
            </div>

      <label>Total Hours:</label>
      <input placeholder='Enter Course Total Hours' required  className={cc.box} 
        type="number"   min="1"
        onChange={(e) => setTotalHours(e.target.value)} 
        value={totalHours}
      />
           <div>&nbsp;</div>
           <label>Description:</label>
      <input placeholder='Enter Course Description'required type="text"  className={cc.box} id="outlined-basic"  fullWidth variant="outlined" onChange={(e) => setDescription(e.target.value)} 
       value={description}/>
           <div>&nbsp;</div>

     <label>Choose Subject</label>
     <div className={cc.makanS}></div>
     <select className={cc.sub} value={resultingSubject} onChange={handleChange}>
              <option value="">Select Subject</option>

        {subject.map(subject => (
              <option value={subject.title} key={subject.id} >{subject.title} </option>
    
              ))
              }

          </select>

    
      
         <h3 className="mt-3 mb-4 fw-bold">Add Subtitles : </h3>
         <div className={cc.part2}>
           
            { 
            inputList.map( (x,i)=>{
              return(
              <div  >
              
                 <label >Subtitle Name:</label>
                 <input className={cc.boxA} type="text" name="title"  required    placeholder="Enter Subtitle" onChange={ e=>handleinputchange(e,i) }/>
                 <div>&nbsp;</div>
    
               <label >Total Hours :</label>
                  <input className={cc.boxA} type="Number" name="totalHours" min="1" required   placeholder="Enter Total Hours" onChange={ e=>handleinputchange(e,i) }/>
                  <div>&nbsp;</div>

               {/* <label >Video  :</label>
                  <input className={cc.boxA} type="text" name="Video"  required    placeholder="Enter Video" onChange={ e=>handleinputchange(e,i) }/> */}
                 {inputList3.map((y,j)=>{
                return(
                  <div>
               <label >Video  :</label>
                  <input className={cc.boxA} type="text" placeholder="Enter Video" name="Video" onChange={ e=>handleinputchange(e,j,i) }/>
                  <div className={cc.but}>
               {
                  inputList3.length!==1 &&
                 <button  className={cc.buttonB} type="button" onClick={()=> handleremove3(j)}>Remove Video</button>
               }
               </div>
                <div className={cc.but}>
               { inputList3.length-1==j&&
               <button  className={cc.buttonC} type="button" onClick={handleaddclick3} >Add More Videos</button>
               }
               </div>
            </div>
              ) })} 
                  <div>&nbsp;</div>

               <label >Short Description  :</label>
                  <input className={cc.boxA} type="text" name="shortDescrip" required    placeholder="Enter Short Description" onChange={ e=>handleinputchange(e,i) }/>
                  <div className={cc.but}>
                

               {
                  inputList.length!==1 &&
                 <button  className={cc.buttonB} onClick={()=> handleremove(i)}>Remove</button>
               }
               </div>
                <div className={cc.but}>
               { inputList.length-1===i &&
               <button  className={cc.buttonC} onClick={ handleaddclick}>Add More</button>
               }
               </div>
             </div> 
              );
             } )} 
               
       </div>
    
      <div className={cc.but}>
      <button className={cc.buttonA}>Add Course</button>
      {error && <div className="error">{error}</div>}
      <p className={cc.ps}>PS: Once you add a course you will be redirected to create exams for course.</p>
      <p className={cc.ps2}>If exams were not created, the course will not be published.</p>
      </div>
      </div>
      
    </form>
    </div>}
    </div>
    {showExam &&   <div className={cc.allC}> 
    {times===0 && 
    <form className={cc.create} onSubmit={handleSubmit2}>
          <div className={st.create2}>
         <h1> Fill this form {nbExams} times</h1>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>

        <h1 className="mt-3 mb-4 fw-bold fs-" >Add an Exam for Course : {coursee.title}</h1>
        <div className={cc.first}>
            {/* <label>Course Title/Subtitle Name:</label>
            <input type='text'placeholder='Enter Title' className={cc.box} id="outlined-basic" required fullWidth variant="outlined" onChange={(e) => setCourseId(e.target.value)} 
             value={CourseId}/> */}
                            <div>&nbsp;</div>

            <label>Quiz Number: </label>
            <input type='text' placeholder='Enter Quiz Number' className={cc.box} id="outlined-basic" required fullWidth variant="outlined" onChange={(e) => setQuizNo(e.target.value)} 
             value={QuizNumber}/>
          </div>
          <div>&nbsp;</div>

<div className={st.row}>
       <div className="col-sm-12">
         <h3 className="mt-3 mb-4 fw-bold">Add Your Questions  </h3>
         <div>&nbsp;</div>

           
            { 
            inputList2.map( (x,i)=>{
              return(
              <div >
                <div className={cc.second}>
                 <label >Question :</label>
                  <input type='text' className={cc.box} id="outlined-basic" required fullWidth variant="outlined"  name="question"  placeholder="Enter Question" onChange={ e=>handleinputchange2(e,i)} /><br></br>
                  <label >First Choice :</label>
                  <input type='text' className={cc.box} id="outlined-basic" required  fullWidth variant="outlined" key={1}   name="choice1" placeholder="Enter choice 1" onChange={ e=>handleinputchange2(e,i) }/>
                  <div>&nbsp;</div>
                  <label >Second Choice :</label>
                  <input type='text' className={cc.box} id="outlined-basic" required fullWidth variant="outlined" name="choice2" key={2}   placeholder="Enter choice 2" onChange={ e=>handleinputchange2(e,i) }/> <br></br>
                  <label >Third Choice :</label>
                  <input type='text' className={cc.box} id="outlined-basic"required fullWidth variant="outlined"  name="choice3" key={3}    placeholder="Enter choice 3" onChange={ e=>handleinputchange2(e,i) }/><br></br>
                  <label >Forth Choice :</label>
                  <input type='text'  className={cc.box} id="outlined-basic" required fullWidth variant="outlined"  name="choice4" key={4}    placeholder="Enter choice 4" onChange={ e=>handleinputchange2(e,i) }/><br></br>
                  <div>&nbsp;</div>
                
</div>
                  
               <div >
 <h3 className="mt-3 mb-4 fw-bold"> Choose The Correct Answer</h3>
 <section class={st.light}>
<label>
  <input class={st.rd} type="radio" name="correctAns" value="1" onChange={ e=>handleinputchange2(e,i) }  required></input>
  <span class={st.design}></span>
  <span class={st.text11}>Choice 1</span>
</label>
<div>&nbsp;</div>

<label>
  <input class={st.rd} type="radio" name="correctAns"  value="2"  onChange={ e=>handleinputchange2(e,i) }></input>
  <span class={st.design}></span>
  <span class={st.text11}>Choice 2</span>
</label>
<div>&nbsp;</div>

<label>
  <input class={st.rd}  type="radio" name="correctAns" value="3" onChange={ e=>handleinputchange2(e,i) }></input>
  <span class={st.design}></span>
  <span class={st.text11}>Choice 3</span>
</label>
<div>&nbsp;</div>

<label>
  <input class={st.rd}  type="radio" name="correctAns"  value="4"  onChange={ e=>handleinputchange2(e,i) }></input>
  <span class={st.design}></span>
  <span class={st.text11}>Choice 4</span>
</label>
</section> 
               {
                  inputList2.length!==1 &&
                  <button  className={cc.buttonB} onClick={()=> handleremove2(i)}>Remove</button>
               }
                                 <br></br>

               { inputList2.length-1===i &&
               <button  class={cc.buttonC} role="button" onClick={ handleaddclick2}>Add More</button>

               }
               <br></br>
               </div>
            </div>
              );
             } )} 

               
       </div>
     </div>
     <button class={cc.buttonA} role="button">Add Exam</button>
     </div>
    
            </form>} 
            {times!==0 && times!=nbExams && 
    <form className={cc.create} onSubmit={handleSubmit3}>
          <div className={st.create2}>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>

        <h1 className="mt-3 mb-4 fw-bold fs-" >Add an Exam for Subtitle : {getSubtitles[times-1].title}</h1>
        <div className={cc.first}>
            {/* <label>Course Title/Subtitle Name:</label>
            <input type='text'placeholder='Enter Title' className={cc.box} id="outlined-basic" required fullWidth variant="outlined" onChange={(e) => setCourseId(e.target.value)} 
             value={CourseId}/> */}
                            <div>&nbsp;</div>

            <label>Quiz Number: </label>
            <input type='text' placeholder='Enter Quiz Number' className={cc.box} id="outlined-basic" required fullWidth variant="outlined" onChange={(e) => setQuizNo(e.target.value)} 
             value={QuizNumber}/>
          </div>
          <div>&nbsp;</div>

<div className={st.row}>
       <div className="col-sm-12">
         <h3 className="mt-3 mb-4 fw-bold">Add Your Questions  </h3>
         <div>&nbsp;</div>

           
            { 
            inputList2.map( (x,i)=>{
              return(
              <div >
                <div className={cc.second}>
                 <label >Question :</label>
                  <input type='text' className={cc.box} id="outlined-basic" required fullWidth variant="outlined"  name="question"  placeholder="Enter Question" onChange={ e=>handleinputchange2(e,i)} /><br></br>
                  <label >First Choice :</label>
                  <input type='text' className={cc.box} id="outlined-basic" required  fullWidth variant="outlined" key={1}   name="choice1" placeholder="Enter choice 1" onChange={ e=>handleinputchange2(e,i) }/>
                  <div>&nbsp;</div>
                  <label >Second Choice :</label>
                  <input type='text' className={cc.box} id="outlined-basic" required fullWidth variant="outlined" name="choice2" key={2}   placeholder="Enter choice 2" onChange={ e=>handleinputchange2(e,i) }/> <br></br>
                  <label >Third Choice :</label>
                  <input type='text' className={cc.box} id="outlined-basic"required fullWidth variant="outlined"  name="choice3" key={3}    placeholder="Enter choice 3" onChange={ e=>handleinputchange2(e,i) }/><br></br>
                  <label >Forth Choice :</label>
                  <input type='text'  className={cc.box} id="outlined-basic" required fullWidth variant="outlined"  name="choice4" key={4}    placeholder="Enter choice 4" onChange={ e=>handleinputchange2(e,i) }/><br></br>
                  <div>&nbsp;</div>
                
</div>
                  
               <div >
 <h3 className="mt-3 mb-4 fw-bold"> Choose The Correct Answer</h3>
 <section class={st.light}>
<label>
  <input class={st.rd} type="radio" name="correctAns" value="1" onChange={ e=>handleinputchange2(e,i) }  required></input>
  <span class={st.design}></span>
  <span class={st.text11}>Choice 1</span>
</label>
<div>&nbsp;</div>

<label>
  <input class={st.rd} type="radio" name="correctAns"  value="2"  onChange={ e=>handleinputchange2(e,i) }></input>
  <span class={st.design}></span>
  <span class={st.text11}>Choice 2</span>
</label>
<div>&nbsp;</div>

<label>
  <input class={st.rd}  type="radio" name="correctAns" value="3" onChange={ e=>handleinputchange2(e,i) }></input>
  <span class={st.design}></span>
  <span class={st.text11}>Choice 3</span>
</label>
<div>&nbsp;</div>

<label>
  <input class={st.rd}  type="radio" name="correctAns"  value="4"  onChange={ e=>handleinputchange2(e,i) }></input>
  <span class={st.design}></span>
  <span class={st.text11}>Choice 4</span>
</label>
</section> 
               {
                  inputList2.length!==1 &&
                  <button  className={cc.buttonB} onClick={()=> handleremove2(i)}>Remove</button>
               }
                                 <br></br>

               { inputList2.length-1===i &&
               <button  class={cc.buttonC} role="button" onClick={ handleaddclick2}>Add More</button>

               }
               <br></br>
               </div>
            </div>
              );
             } )} 

               
       </div>
     </div>
     <button class={cc.buttonA} role="button">Add Exam</button>
     </div>
    
            </form>} 
            {times===nbExams &&  
            <div className={cc.shadearea}>
            <div className={cc.modalcontainerr}>
                <p className={cc.editbiotext2}>Course and Exams were created successfully </p>
                <button className={cc.submiteditbutton2} onClick={()=>window.location.href="/InstructorHomePage"}>Go to Home Page</button>
                
            </div> 
          </div>}
            </div>}
          
    </React.Fragment>

  )
}

export default CreateCourseNew;
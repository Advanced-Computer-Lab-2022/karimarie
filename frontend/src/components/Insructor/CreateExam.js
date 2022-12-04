import { useState } from 'react'
import { Typography } from '@mui/material'
import React from 'react'
import { useEffect } from "react";
import axios from "axios";



const CreateExam = () => {
    const [CourseId, setCourseId] = useState('')
    const [QuizNumber, setQuizNo] = useState('')
    const [questions, setQuestion] = useState('')
    const [choice, setChoice]= useState('')
    const [selected, setselected]= useState('')

    const sendRequest = async () => {
        // console.log(input)
        // console.log(input.length)
        
        //     console.log(input[0].options)
        const res = await axios
          .post("http://localhost:2000/instructor/createExam", {
            CourseId: CourseId,
            QuizNumber:QuizNumber,
            Content: inputList
          })
          .catch((err) => console.log(err));
        
       
    };

    // {
    //     "choice": "df",
    //     "isCorrect": true,
    //     "_id": "637f6c88d216488ecd38670b"
    // },
        // const [choiceList,setChoiceList]=useState([{choice:'',choice: '', choice:'', choice:''}])
        // const [inputList, setinputList]= useState([{questions :''}]);
        // const [question, setquestion]= useState({questions :''});
        // const [input,setinput]=useState([])
        const handleSubmit = (e) => {
          e.preventDefault();
        //   console.log(inputList)
          
          
        //   setinputList(inputList.concat({options : choiceList}));
        //  console.log(inputList)
        //  if(input.length!==0){
            sendRequest();
        //}
          setCourseId('')
        //  // setinputList([{questions:''}])
        //   setQuestion('')
        //   setChoice('')
        //   setQuizNo('')
        };
       
       
          const [inputList, setinputList]= useState([{ question:'', choice1:'',choice2:'',choice3:'',choice4:'',correctAns:''}]);
  const handleinputchange=(e, index)=>{
    const {name, value}= e.target;
    const list= [...inputList];
    list[index][name]= value;
    setinputList(list);

  }
 console.log(inputList)
  const handleremove= index=>{
    const list=[...inputList];
    list.splice(index,1);
    setinputList(list);
  }

  const handleaddclick=()=>{ 
    setinputList([...inputList, { question:'', choice1:'',choice2:'',choice3:'',choice4:'',correctAns:''}]);
  }
         
     console.log(selected)
      return(
        <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Exam</h3>
            <label>Course Id:</label>
            <input 
            type="text" 
            onChange={(e) => setCourseId(e.target.value)} 
             value={CourseId}
            />
            <label>Quiz Number: </label>
            <input 
            type="text" 
            onChange={(e) => setQuizNo(e.target.value)} 
             value={QuizNumber}
             />
<div className="row">
       <div className="col-sm-12">
         <h5 className="mt-3 mb-4 fw-bold">Add Your Questions : </h5>
           
            { 
            inputList.map( (x,i)=>{
              return(
              <div className="row mb-3">
                 <div class="form-group col-md-4">
                 <label >Question :</label>
                  <input type="text"  name="question" class="form-control"  placeholder="Enter Question" onChange={ e=>handleinputchange(e,i)} />
               </div>

               <div class="form-group col-md-4">
                  <input type="text"  name="choice1" key={1} class="form-control"   placeholder="Enter choice 1" onChange={ e=>handleinputchange(e,i) }/>
               </div>
               <div class="form-group col-md-4">
                  <input type="text"  name="choice2" key={2} class="form-control"   placeholder="Enter choice 2" onChange={ e=>handleinputchange(e,i) }/>
               </div>
               <div class="form-group col-md-4">
                  <input type="text"  name="choice3" key={3} class="form-control"   placeholder="Enter choice 3" onChange={ e=>handleinputchange(e,i) }/>
               </div>
               <div class="form-group col-md-4">
                  <input type="text"  name="choice4" key={4} class="form-control"   placeholder="Enter choice 4" onChange={ e=>handleinputchange(e,i) }/>
               </div>
               <div class="form-group col-md-4">
                  <input type="text"  name="correctAns" key={5} class="form-control"   placeholder="Enter correctAns" onChange={ e=>handleinputchange(e,i) }/>
               </div>
               <div class="form-group col-md-2 mt-4">
               {
                  inputList.length!==1 &&
                  <button  className="btn btn-danger mx-1" onClick={()=> handleremove(i)}>Remove</button>
               }
               { inputList.length-1===i &&
               <button  className="btn btn-success" onClick={ handleaddclick}>Add More</button>
               }
               </div>
            </div>
              );
             } )} 

               
       </div>
     </div>
     <button>Add Exam</button>
            </form>
        )
}
export default CreateExam;
import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import  { useState,useRef } from "react";
import "../Quiz/QuizTempCss.css";
import logo from "../Quiz/letter-q.png";
import {  useParams } from "react-router-dom";
import axios from "axios";
const McqQuiz = () => {
    const CourseId = useParams().CourseId;
    const[Questionbank,setQ]=useState([]);
    const sendRequest = async () => {
        const res = await axios
          .get(`http://localhost:2000/getExamSol/${CourseId}/2`)
          .catch((err) => console.log(err));
          const data = await res.data;
          
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => setQ(data.exam[0].Content));
        
        
      }, []);
     
   
    const[start,setStart]=useState("start");
    const[currentQuestion,setCurentQuestion]=useState(0);
    const[score,setScore]=useState(0);
    const[showScore,setShowScore]=useState(false);
    const[studAnswer,isStudAnswer]=useState(false);//basheel fe el value t or f beta3t el button el das 3aleh
    const [answers,setAnswers]=useState([]);//basheel fe egabat el student
    const[currentQuestion2,setCurentQuestion2]=useState(0);
   
    const [buttonSelected, setButtonSelected] = useState(new Array(4).fill(false));

    const handleAnswer=(isCorrect,choice,index)=>{
        let result = [...buttonSelected];
        for (let i=0;i<result.length;i++){
            if(i==index){
                result[index] =!result[index] ;
                setButtonSelected(result); 
            }
            else {
                
                if(result[i]==true){
                    result[i] = !result[i] ;
                }
                else{
                result[i] = result[i] ;
                }
                setButtonSelected(result); 
            }
        }
        if(result[index]==true){
           
        isStudAnswer(isCorrect);
        
        }
        else{
            isStudAnswer(false);
            //answers[currentQuestion]=choice;
        }
        answers[currentQuestion]=index;
        console.log("hey"+answers);
      
    }
    
    const handleAnswer2=(isCorrect,choice,index)=>{
      
        isStudAnswer(isCorrect);
        answers[currentQuestion]=choice
     
        
    }
    const sub=()=>{
        if(studAnswer.toString().localeCompare(true)==0){
            setScore(score+1);
        }
        const nextQuestion=currentQuestion+1;
        if(nextQuestion<Questionbank.length){
             setCurentQuestion(nextQuestion);
        }
        else{
            setStart("showAnswers")
        }
        setButtonSelected(new Array(Questionbank[currentQuestion].options.length).fill(false));
    }
    const sub2=()=>{
       
     
        const nextQuestion=currentQuestion2+1;
        if(nextQuestion<Questionbank.length){
             setCurentQuestion2(nextQuestion);
        }
        else{
            

        }
    }
    
      return (
        <React.Fragment>

        {start==="start"&&     <div class="box">
               <h3 class="Title" text-align= "center">MCQ Quiz</h3>
               <ol>
                <li>Answers are saved after the submit</li>
                <li>You cant return back to a question</li>
                <li>It is advised to solve all questions</li>
	
                </ol>
            <Button 
               onClick={()=>setStart("startQuiz")}
                >Start</Button>
                </div>}
        {start==="startQuiz" &&<div class="box">
               <span><img src={logo} className="Q" alt="Logo" width="23" height="23" display= "inline-block" /></span> <span>{currentQuestion+1}</span>/{Questionbank.length}
               <h3 class="Title">{ Questionbank[currentQuestion].questions}</h3>
               { Questionbank[currentQuestion].options.map((answer,index)=>(
                <button class="Option1" 
                style={{backgroundColor: buttonSelected[index] ? 'blue':'white'}}
                key={index}
                onClick={()=>handleAnswer(answer.isCorrect,answer.choice,index)}
                >
               {answer.choice}
              </button>
               ))}
                <Button 
                 onClick={()=>sub()}
                >Submit</Button>
            </div> }
        {start==="showAnswers"&& <div class="box">
                <div>You have scored {score}out of{Questionbank.length}</div>
               <span><img src={logo} className="Q" alt="Logo" width="23" height="23" display= "inline-block" /></span> <span>{currentQuestion2+1}</span>/{Questionbank.length}
               <h3 class="Title">{Questionbank[currentQuestion2].questions}</h3>
                {Questionbank[currentQuestion2].options.map((answer, index) => {
          if((answer.isCorrect).toString().localeCompare(true)===0){
            return  <button class="Option1"  style={{backgroundColor: 'green'}}
             >{answer.choice} {answer.isCorrect}</button>
        }else if( ( answers[currentQuestion2]!==undefined && (answers[currentQuestion2]).toString().localeCompare(index)===0)){ 
            return  <button class="Option1"  style={{backgroundColor: 'red'}}
            >{answer.choice}</button>      
        }else {
            return  <button class="Option1" 
            >{answer.choice}</button> 
        }
          })}
                <Button 
                 onClick={()=>sub2()}
                >Next</Button>
            </div>}
       </React.Fragment>
    )
}

export default McqQuiz;
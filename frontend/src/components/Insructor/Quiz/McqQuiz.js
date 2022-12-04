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
          .get(`http://localhost:2000/getExamSol/${CourseId}`)
          .catch((err) => console.log(err));
          const data = await res.data;
          
          return data;
      };
      useEffect(() => {
        sendRequest().then((data) => setQ(data.exam[0].Content));
        
        
      }, []);
     
   console.log(Questionbank)
    const[start,setStart]=useState("start");
    const[currentQuestion,setCurentQuestion]=useState(0);
    const[score,setScore]=useState(0);
    const[showScore,setShowScore]=useState(false);
    const[studAnswer,isStudAnswer]=useState(false);//basheel fe el value t or f beta3t el button el das 3aleh
    const [answers,setAnswers]=useState([]);//basheel fe egabat el student
    const[currentQuestion2,setCurentQuestion2]=useState(0);
    const [result, setResult] = useState(new Array(4).fill(false));
    const [choiceSelect,setChoiceSelect]=useState(new Array(4).fill(false))
    const [buttonSelected, setButtonSelected] = useState(new Array(4).fill(false));

    const handleAnswer=(keyselected,correctAns)=>{
        console.log(keyselected)
        console.log(correctAns)
        let result = [...buttonSelected];
        for (let i=0;i<result.length;i++){
            if(i==(keyselected-1)){
                result[keyselected-1] =!result[keyselected-1] ;
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
        if(keyselected.localeCompare(correctAns)===0){
            console.log('hey')
            isStudAnswer(true)
        }
        else{
            isStudAnswer(false);
            //answers[currentQuestion]=choice;
        }
        answers[currentQuestion]=keyselected;
        console.log("hey"+answers);
      
    }
    console.log(studAnswer)
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
        setButtonSelected(new Array(4).fill(false));
    }
    console.log(score+"ddddddddddddddd")
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
               <h3 class="Title">{ Questionbank[currentQuestion].question}</h3>
               <button class="Option1" 
                value={1}
                style={{backgroundColor: buttonSelected[0] ? 'blue':'white'}}
                onClick={(e)=>handleAnswer(e.target.value,Questionbank[currentQuestion].correctAns)}
                > {Questionbank[currentQuestion].choice1}</button>
                 <button class="Option1" 
                style={{backgroundColor: buttonSelected[1] ? 'blue':'white'}}
                value={2}
                onClick={(e)=>handleAnswer(e.target.value,Questionbank[currentQuestion].correctAns)}
                > {Questionbank[currentQuestion].choice2}</button>
                 <button class="Option1" 
                style={{backgroundColor: buttonSelected[2] ? 'blue':'white'}}
                value={3}
                onClick={(e)=>handleAnswer(e.target.value,Questionbank[currentQuestion].correctAns)}
                > {Questionbank[currentQuestion].choice3}</button>
                  <button class="Option1" 
                style={{backgroundColor: buttonSelected[3] ? 'blue':'white'}}
                value={4}
                onClick={(e)=>handleAnswer(e.target.value,Questionbank[currentQuestion].correctAns)}
                > {Questionbank[currentQuestion].choice4}</button>
                <Button 
                 onClick={()=>sub()}
                >Submit</Button>
            </div> }
        {start==="showAnswers"&& <div class="box">
                <div>You have scored {score}out of{Questionbank.length}</div>
               <span><img src={logo} className="Q" alt="Logo" width="23" height="23" display= "inline-block" /></span> <span>{currentQuestion2+1}</span>/{Questionbank.length}
               <h3 class="Title">{Questionbank[currentQuestion2].question}</h3>
               
                {result.map((answer, index) => {
                    var select=0;
                    if(index==0){
                        select=Questionbank[currentQuestion2].choice1
                    }
                    if(index==1){
                        select=Questionbank[currentQuestion2].choice2
                    }
                    if(index==2){
                        select=Questionbank[currentQuestion2].choice3
                    }
                    if(index==3){
                        select=Questionbank[currentQuestion2].choice4
                    }       
          if((index+1).toString().localeCompare(Questionbank[currentQuestion2].correctAns.toString())===0){
            
            return  <button class="Option1"  style={{backgroundColor: 'green'}}
             > {select}</button>
        }else if( ( answers[currentQuestion2]!==undefined && (answers[currentQuestion2]).toString().localeCompare(index+1)===0)){ 
            return  <button class="Option1"  style={{backgroundColor: 'red'}}
            >{select}</button>      
        }else {
            return  <button class="Option1" 
            >{select}</button> 
        }
          })}
              {currentQuestion2<Questionbank.length-1 &&  <Button 
                 onClick={()=>sub2()}
                >Next</Button>}
            </div>}
       </React.Fragment>
    )
}

export default McqQuiz;
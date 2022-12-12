import React from 'react'
import x from "./VRQ.module.css"
import axios from "axios";
import { useEffect, useState } from "react";

const ViewRefundReq = () => {
    const [backgC,setBackgC]=useState("red");
    const [stateShow,setStateShow]=useState("Unseen");
    const [currency, setCurrency] = useState('Action')
    const [m,setM]=useState([1,2,3,5]);
    const [choiceSelect,setChoiceSelect]=useState(new Array(m.length).fill("unseen"))
    const forState=(value,index)=>{
      
        choiceSelect[index]=value;
        console.log(choiceSelect)
        
    }
  return (
   <React.Fragment>
        <h2 className={x.title}>Refund Requests</h2>

    <div className={x.wrapper}>
  
  <div className={x.table}>
    
    <div className={[x.row, x.header].join(' ')}>
      <div className={x.cell}>
        Name
      </div>
      <div className={x.cell}>
       Course 
      </div>
      <div className={x.cell}>
        Amount
      </div>
      <div className={x.cell}>
        Action
      </div>
    </div>
    
   {m&& choiceSelect &&m.map((req,i) => (

<div className={x.row}>
<div className={x.cell} >
  Luke Peters
</div>
<div className={x.cell} >
  Financial
</div>
<div className={x.cell} >
    67 EGP
</div>
<div className={x.cell} >

<button className={x.b10} role="button">Refund</button>


</div>
</div>
   ))} 
    </div>
  </div>
  
 
  

   </React.Fragment>
  )
}
export default ViewRefundReq
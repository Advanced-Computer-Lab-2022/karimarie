import React, { useState } from 'react'
import x from "./viewRep.module.css"
const ViewReports = () => {
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
        <h2 className={x.title}>Reports</h2>

    <div className={x.wrapper}>
  
  <div className={x.table}>
    
    <div className={[x.row, x.header].join(' ')}>
      <div className={x.cell}>
        Name
      </div>
      <div className={x.cell}>
        Report Type
      </div>
      <div className={x.cell}>
        Report
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
  Freelance Web Developerbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbggggggggggggggggggg gygyyyyyyyyyyy vgggvgv tgf
</div>
<div className={x.cell} >

<div className={x.status} >{choiceSelect[i]}</div>
<select
  className={x.select}
  value={currency}
  id={i}
  onChange={(e) => forState(e.target.value,i)}
>
  <option selected="selected" hidden value="EGP">Action</option>
  <option value="Resolved">Resolve</option>
  <option value="Pending">Pend</option>
</select>


</div>
</div>
   ))} 
    </div>
  </div>
  
 
  

   </React.Fragment>
  )
}

export default ViewReports
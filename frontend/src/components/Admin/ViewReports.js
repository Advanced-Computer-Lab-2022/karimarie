import React from 'react'
import x from "./viewRep.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

const ViewReports = () => {
    const [backgC,setBackgC]=useState("red");
    const [count,setcount]=useState(0)
    const [stateShow,setStateShow]=useState("Unseen");
    const [currency, setCurrency] = useState('Action')
    const [m,setM]=useState([1,2,3,5]);
    const [choiceSelect,setChoiceSelect]=useState(new Array(m.length).fill("unseen"))
    const [reports,setReports]=useState([]);
    const [xx,setX]=useState("hey");

    const forState=async (value,index,id)=>{
      console.log(value);
      console.log(index);
      console.log(id);
        choiceSelect[index]=value;
        console.log(choiceSelect)
        const res = await axios
        .post("http://localhost:2000/admin/editReport",{
          id:id ,
          Status:value
        })
        .catch((err) => console.log(err));
        const data = await res.data;
        setX(id);
        setcount(count+1);
        return data;

        
    }

    const sendRequest = async () => {
      const res = await axios
        .get("http://localhost:2000/admin/getReports")
        .catch((err) => console.log(err));
        const data = await res.data;
  
        return data;
    };
    const SuccMessage = () => (
      <div >errorM</div>  
    ); 
    useEffect(() => {
      sendRequest().then((data) => {setReports(data.report);
      }
      
      
      );
     
      
    }, [count]);
   
  // console.log(reports[0].ReportByName);
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
        User Type 
      </div>
      <div className={x.cell}>
        Report Type
      </div>
      <div className={x.cell}>
       Course
      </div>
      <div className={x.cell}>
        Report
      </div>
      <div className={x.cell}>
        Action
      </div>
      <div className={x.cell}>
        User FollowUp
      </div>
    </div>
    
   {reports&& choiceSelect &&reports.map((req,i) => (

<div className={x.row}>
<div className={x.cell} >
  {req.ReportByName}
</div>
<div className={x.cell} >
  <div className={x.type} >

{req.ReportByType}
</div>
</div>
<div className={x.cell} style={{color : req.Type === "Technical" ? "blue" : "#227C70"}} >
{req.Type}
</div>
<div className={x.cell} >
{req.CourseName}
</div>
<div className={x.cell} >
{req.Report}
</div>
<div className={x.cell} >

<div className={x.status} style={{"background-color" : req.Status === "Unseen" ? "red" : "Pending" ? "yellow" : "Resolved" ? "green" : "blue"}} >{req.Status}</div>
<select
  className={x.select}
  value={currency}
  id={i}
  onChange={(e) => forState(e.target.value,i,req._id)}
>
  <option selected="selected" hidden value="EGP">Action</option>
  <option value="Resolved">Resolve</option>
  <option value="Pending">Pend</option>
</select>


</div>
<div className={x.cell} >
{req.FollowUp}
</div>
</div>
   ))} 
    </div>
  </div>
  
 
  

   </React.Fragment>
  )
}

export default ViewReports
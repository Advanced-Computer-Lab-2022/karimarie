import $ from 'jquery';
import React, { useState } from 'react'
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import {Link} from 'react-router-dom';
import l from "../Admin/StartC.module.css";
import NavbarHomePage from './S3_components/NavbarHomePage';
import AddInstructor from './Create/AddInstructor';
import AddAdmin from './Create/AddAdmin';
import AddCorpTrainee from './Create/AddCorpTrainee';
import ViewReq from '../../components/Admin/ViewReq';
import ViewReports from '../../components/Admin/ViewReports';
import ViewRefundReq from '../../components/Admin/ViewRefundReq';
const Start = () => {

  const data = [
    {
      name: "Page A",
      uv: 8000,
      // pv: 400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 8000,
      amt: 3210
    },
    {
      name: "Page C",
      uv: 8000,
      // pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 8780,
      // pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 8000,
      // pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      // pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      // pv: 4300,
      amt: 2100
    }
  ];
    const [active,isActive]=useState("");
    const [choose,setChoose]=useState('home');
    const handleClick = (e) => {
        console.log(choose);
    
      };
  return (
    <React.Fragment className={l.all}>
    
   <React.Fragment>
   <body className={l.bodyy}>
    <div className={l.wrapper} style={{display:"inline"}}>
    <div className={l.sidebar}>
        
        <ul>
            <li className={l.listI}><button onClick={() => {setChoose('create');handleClick(); }} 
            className={l.anc}><i class="fas fa-user" style={{color:"white"}}></i><p className={l.text}>Create User</p></button></li>
            <li className={l.listI}><button className={l.anc} onClick={()=>setChoose("creq")}><i className={["fas fa-address-card", l.iconn].join(' ')} style={{color:"white"}}></i><p className={l.text}>Course Requests</p></button></li>
            <li className={l.listI}><button className={l.anc} onClick={()=>setChoose("viewReports")}><i className={["fas fa-project-diagram", l.iconn].join(' ')} style={{color:"white"}}></i><p className={l.text}>View Reports</p></button></li>
            <li className={l.listI}><button className={l.anc} onClick={()=>setChoose("RefundRequests")}><i className={["far fa-money-bill-alt", l.iconn].join(' ')} style={{color:"white"}} ></i><p className={l.text}>Refund Requests</p></button></li>
            <li className={l.listI}><button className={l.anc}><i class="fas fa-address-book" style={{color:"white"}}></i><p className={l.text}>Contact</p></button></li>
            <li className={l.listI}><button className={l.anc}><i class="fas fa-map-pin" style={{color:"white"}}></i><p className={l.text}>Map</p></button></li>
        </ul> 
    </div>
</div>

</body>

<NavbarHomePage className={l.zz}></NavbarHomePage> 
<div className={l.home}>
{choose=='home'&&
<React.Fragment>
<div className={l.analytics}>
    <h3 className={l.analH}>Today's Analytics</h3>
    <div className={l.analRight}>
      <div className={l.totCourses}>
        <p className={l.numberOf}>Number Of Courses</p>
        <img   src={require('../Admin/encyclopedia.png')}  className={l.img}/>
        <span className={l.span1}>12</span>

      </div>
      <div className={l.totInst}>
        <p className={l.numberOf}>Number Of Instructors</p>
        <img   src={require('../Admin/instructor.png')} className={l.img}/>
        <span className={l.span1}>12</span>

        </div>
      <div className={l.totTrainees}>
        <div className={l.x}>
        <p className={l.numberOf}>Number Of Trainees</p>
        <img src={require('../Admin/job.png')} className={l.img}></img>
        <span className={l.span1}>12</span>
        </div>
      </div>
    
    </div>
  </div>
<div className={l.reportsNum}>
    <div className={l.repWhite}><p className={l.rep}>Reports</p> <button className={l.button1} role="button">Resolve</button>
</div>
    <div className={l.blue}>
      <div className={[l.totR, l.r].join(' ')}><p className={l.RepText}>Total Reports</p> <p className={l.repNum}>369</p></div>
      <div className={[l.totTech, l.r].join(' ')}><p className={l.RepText}>Technical Reports</p><p className={l.repNum}>39</p></div>
      <div className={[l.totFin, l.r].join(' ')}><p className={l.RepText}>Financial Reports</p><p className={l.repNum}>46</p></div>
      <div className={[l.totOther, l.r].join(' ')}><p className={l.RepText}>Other Reports</p><p className={l.repNum}>172</p></div>
      
    </div>
  </div>
<div className={l.chart}>

{/* <BarChart width={450} height={400} data={data}>
      <Bar dataKey="uv" fill="#8884d8" options={{}} />
    </BarChart> */}
</div>
</React.Fragment>
}
{choose==='create'&&
<React.Fragment>
<select className={l.select} id="language"   onChange={(e) => isActive(e.target.value)}>
  <option value="c" selected="selected" hidden><p className={l.c} >Create ..</p></option>  
  <option className={l.createO}value="AddAdmin">Admin</option>
  <option className={l.createO}value="AddInst">Instructor</option>
  <option className={l.createO}value="AddCorp">Corporate Trainee</option>
</select>
<div className={l.formCreate}>
{active==="AddInst" && <AddInstructor className={l.formCreate}/>}
{active==="AddAdmin" && <AddAdmin className={l.formCreate}/>}
{active==="AddCorp" && <AddCorpTrainee className={l.formCreate}/>}

</div>
</React.Fragment>
}
{choose==='creq'&& <ViewReq/>}
{choose==="viewReports"&& <ViewReports/>}
{choose==="RefundRequests"&& <ViewRefundReq/>}
</div>
</React.Fragment>




    </React.Fragment>
  )
}

export default Start
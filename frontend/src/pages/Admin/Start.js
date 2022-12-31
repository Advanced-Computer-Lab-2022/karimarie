import React, { useState ,useEffect} from 'react'
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import {Link} from 'react-router-dom';
import l from "../Admin/StartC.module.css";
import AddInstructor from './Create/AddInstructor';
import NavbarAdminPage from './S3_components/NavbarAdminPage';
import AddAdmin from './Create/AddAdmin';
import AddCorpTrainee from './Create/AddCorpTrainee';
import ViewReq from '../../components/Admin/ViewReq';
import ViewReports from '../../components/Admin/ViewReports';
import ViewRefundReq from '../../components/Admin/ViewRefundReq';
import graduated from "./graduated.png"
import instructors from "./instructors.png"
import admin from "./setting.png"
 import error from '../../InstructorHome/error.png'
import axios from "axios";
import DPromotion from '../../components/Admin/DPromotion.js';

const Start = () => {
  const [access,hasaccess]=useState(false)
  const [datas,setdata]=useState("")
  const [courses, setcourses] = useState();
  const [reports,setReports]=useState();
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
          if(data.message==="Admin"){
              hasaccess(true)
          }
          else {
              hasaccess(false)
          }
      });
        
      
    }}, []);
    const getCourses = async () => {
      const res = await axios
        .get("http://localhost:2000/home")
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };
      useEffect(() => {
        getCourses().then((data) => setcourses(data.priceList));
      }, []);
      const [unseen,setUnseen]=useState(0);
      const [pending,setPending]=useState(0);
      useEffect(() => {
        sendRequest2().then((data) => {console.log(data.report);setReports(data.report);
          for(let i=0;i<data.report.length;i++){
            console.log(data.report[i])
            if(data.report[i].Status.localeCompare("Unseen")==0){
              console.log("hey")
              setUnseen(unseen+1);
            }
            else if(data.report[i].Status.localeCompare("Pending")==0){
              setPending(pending+1);
            }
          }
        }
        
        
        );
       
        
      }, []);
      const sendRequest2 = async () => {
        const res = await axios
          .get("http://localhost:2000/admin/getReports")
          .catch((err) => console.log(err));
          const data = await res.data;
    
          return data;
      };















    const [active,isActive]=useState("");
    const [choose,setChoose]=useState('home');
    const handleClick = (e) => {
        console.log(choose);
    
      };
  return (
    <React.Fragment>
       {access&&
   <React.Fragment>
 
   <body className={l.bodyy}>
    <div className={l.wrapper} style={{display:"inline"}}>
    <div className={l.sidebar}>
        <ul>
            <li className={l.listI}><button onClick={() => {setChoose('create');handleClick(); }} 
            className={l.anc}><i class="fas fa-user" style={{color:"white"}}></i><p className={l.text}>Create User</p></button></li>
            <li className={l.listI}><button className={l.anc} onClick={()=>setChoose("creq")}><i className={["fas fa-address-card", l.iconn].join(' ')} style={{color:"white"}}></i><p className={l.text}>Course Requests</p></button></li>
            <li className={l.listI}><button className={l.anc} onClick={()=>setChoose("Discount")}><i className={["fa fa-percent", l.iconn].join(' ')} style={{color:"white"}}></i><p className={l.text}>Add Discount</p></button></li>

            <li className={l.listI}><button className={l.anc} onClick={()=>setChoose("viewReports")}><i className={["fas fa-project-diagram", l.iconn].join(' ')} style={{color:"white"}}></i><p className={l.text}>View Reports</p></button></li>
            <li className={l.listI}><button className={l.anc} onClick={()=>setChoose("RefundRequests")}><i className={["far fa-money-bill-alt", l.iconn].join(' ')} style={{color:"white"}} ></i><p className={l.text}>Refund Requests</p></button></li>
            <li className={l.listI}><button className={l.anc}><i class="fas fa-address-book" style={{color:"white"}}></i><p className={l.text}>Contact</p></button></li>
            <li className={l.listI}><button className={l.anc}><i class="fas fa-map-pin" style={{color:"white"}}></i><p className={l.text}>Map</p></button></li>
        </ul> 
    </div>
</div>

</body>

<NavbarAdminPage className={l.zz}></NavbarAdminPage> 
<div className={l.home}>
{choose=='home'&&
<React.Fragment>
<div className={l.analytics}>
   <div className={l.cards}>
   <div className={l.card}>
      <div className={l.box}>
        <h1>15</h1>
        <h3 className={l.hhh}>Students</h3>
      </div>
      <div className={l.iconcase}>
        <img className={l.image}src={graduated}></img>
      </div>
   </div>
   <div className={l.card}>
      <div className={l.box}>
        <h1 >10</h1>
        <h3 className={l.hhh}>Instructors</h3>
      </div>
      <div className={l.iconcase}>
        <img className={l.image}src={instructors}></img>
      </div>
   </div>
   <div className={l.card}>
      <div className={l.box}>
        <h1 className={l.hhha}>10</h1>
        <h3 className={l.hhh}>Admins</h3>
      </div>
      <div className={l.iconcase}>
        <img className={l.image}src={admin}></img>
      </div>
   </div>
   </div>
   <div className={l.content2}>
    <div className={l.repo}>
    <div className={l.title}>
      <h2>Reports</h2>
      <button className={l.button3} role="button" onClick={()=>setChoose("viewReports")}>View All</button>
    </div>
    <table className={l.tablee}>
      <tr>
        <th className={l.thh}>Report Type</th>
        <th className={l.thh}>Number of Reports</th>
      </tr>
      <tr>
      {reports &&  <td className={l.tdd}>Unseen</td>}
       {reports&& <td className={l.tdd}>{unseen}  Reports</td>}
      </tr>
      <tr>
       {reports&& <td className={l.tdd}>Pending</td>}
       { reports &&<td className={l.tdd}>{pending}  Reports</td>}
      </tr>

    </table>
   
    </div>
    <div className={l.ccc}>
    <div className={l.title}>
      <h2>Courses</h2>
      <button className={l.button3} role="button"  onClick={()=>setChoose("Discount")}>View All</button>
    </div>
    <table className={l.tablee}>
      <tr>
        <th className={l.thh}>Name</th>
        <th className={l.thh}>Number of Students</th>
      </tr>
      <tr>
      {courses &&  <td className={l.tdd}>{courses[0].title}</td>}
       {courses&& <td className={l.tdd}>{courses[0].numStudents}  Students</td>}
      </tr>
      <tr>
       {courses&& <td className={l.tdd}>{courses[1].title}</td>}
       { courses &&<td className={l.tdd}>{courses[1].numStudents}  Students</td>}
      </tr>
      <tr>
       {courses && <td className={l.tdd}>{courses[2].title}</td> }
       {courses && <td className={l.tdd}>{courses[2].numStudents}  Students</td>}
      </tr>
    </table>
    </div>
   </div>
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
{choose==="Discount"&& <DPromotion/>}
</div>
</React.Fragment>

}

{access===false && <div>
            <img src={error} width="64"></img> Access not granted
            </div>}
    </React.Fragment>
  )
}

export default Start
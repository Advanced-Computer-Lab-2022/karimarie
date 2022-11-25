import React from 'react'
import{ useState } from 'react'
import AllCourses from '../components/AllCourses';
import RateInstructor from '../components/Trainee/RateInstructor'
import RateCourse from '../components/Trainee/RateCourse'
import ForgetPass from '../components/ForgetPass'

import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
const CorpTraineeHome = () => {
    const [chooseC,setChoose]=useState('CorpTrainee');
    const [active,isActive]=useState("");
    return <React.Fragment>
    <AppBar sx={{background:'#B73E3E'}} position='sticky' >
     <Toolbar>
     <Typography variant="h5">Trainee</Typography>
     <Box>
        <Tabs>
          <Tab label="Rate Instructor" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("RateInstructor")}/> 
          <Tab label="Rate Course" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("RateCourse")}/> 
          <Tab label="Forget Password" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("ForgetPass")}/> 

        </Tabs>
      </Box>
      </Toolbar>
      </AppBar>
   
    {active==="RateInstructor" && <RateInstructor/> }
    {active==="RateCourse" && <RateCourse/> }
    {active==="" &&  <AllCourses chooseC={chooseC}/> }
    {active==="ForgetPass" &&  <ForgetPass/> }

      </React.Fragment>
}

export default CorpTraineeHome
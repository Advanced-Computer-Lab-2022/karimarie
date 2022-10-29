import React from 'react'
import AddCourse from '../components/Insructor/AddCourse';
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import{ useState } from 'react'
import AllCourses from '../components/AllCourses';
const InstructorHome = () => {
    const [active,isActive]=useState('Home');
  return <React.Fragment>
     <AppBar sx={{background:'#B73E3E'}} position='sticky' >
     <Toolbar>
     <Typography variant="h5">Instructor</Typography>
     <Box>
        <Tabs>
          <Tab label="Add Course" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("AddCourse")}/> 
          <Tab label="View My Courses" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("AddCourse")}/> 
        </Tabs>
      </Box>
      </Toolbar>
      </AppBar>
    {active==="Home"&& <AllCourses/>}  
    {active==="AddCourse" && <AddCourse/>}
    </React.Fragment>

    
  
}

export default InstructorHome
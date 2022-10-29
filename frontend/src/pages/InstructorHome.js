import React from 'react'
import AddCourse from '../components/Insructor/AddCourse';
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import{ useState } from 'react'
import AllCourses from '../components/AllCourses';
import ViewCourses from '../components/Insructor/ViewCourses';
const InstructorHome = () => {
    const [active,isActive]=useState("");
    const [showResults,setShowResults]=useState();
  return <React.Fragment>
     <AppBar sx={{background:'#B73E3E'}} position='sticky' >
     <Toolbar>
     <Typography variant="h5">Instructor</Typography>
     <Box>
        <Tabs>
          <Tab label="Add Course" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("AddCourse")}/> 
          <Tab label="View My Courses" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("ViewMyCourses")}/> 
        </Tabs>
      </Box>
      </Toolbar>
      </AppBar>
      
    {active==="AddCourse" && <AddCourse/>}
    {active==="" && <AllCourses/>}
    {active==="ViewMyCourses" && <ViewCourses/>}
    </React.Fragment>

    
  
}

export default InstructorHome
import React from 'react'
import AddCourse from '../components/Insructor/AddCourse';
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import{ useState } from 'react'
import AllCourses from '../components/AllCourses';
import SearchFilter from '../components/Insructor/SearchFilter';
import ViewMyCourses from '../components/Insructor/ViewMyCourses';
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
          <Tab label="Filter/Search" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("Filter/Search")}/> 
          <Tab label="View My Courses" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("ViewMyCourses")}/> 
        </Tabs>
      </Box>
      </Toolbar>
      </AppBar>
      
    {active==="AddCourse" && <AddCourse/>}
    {active==="" && <AllCourses/>}
    {active==="Filter/Search" && <SearchFilter/>}
    {active==="ViewMyCourses" && <ViewMyCourses/>}
    </React.Fragment>

    
  
}

export default InstructorHome
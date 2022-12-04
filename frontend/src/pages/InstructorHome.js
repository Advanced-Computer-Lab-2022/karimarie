import React from 'react'
import AddCourse from '../components/Insructor/AddCourse';
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import{ useState } from 'react'
import AllCourses from '../components/AllCourses';
import SearchFilter from '../components/Insructor/SearchFilter';
import ViewMyCourses from '../components/Insructor/ViewMyCourses';
import ViewMyRatings from '../components/Insructor/ViewMyRatings';
import EditProfile from '../components/Insructor/Editprofile'
import ForgetInstructor from '../components/ForgetInstructor'
import CreateExam from '../components/Insructor/CreateExam';

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
          <Tab label="Create Exam" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("CreateExam")}/>
          <Tab label="Filter/Search" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("Filter/Search")}/> 
          <Tab label="View My Courses" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("ViewMyCourses")}/> 
          <Tab label="View My Ratings/Reviews" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("ViewMyratings")}/> 
          <Tab label="Edit Profile" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("EditProfile")}/> 
          <Tab label="Forget Password" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("Forget")}/> 

        </Tabs>
      </Box>
      </Toolbar>
      </AppBar>
      
    {active==="AddCourse" && <AddCourse/>}
    {active==="" && <AllCourses/>}
    {active==="Filter/Search" && <SearchFilter/>}
    {active==="ViewMyCourses" && <ViewMyCourses/>}
    {active==="ViewMyratings" && <ViewMyRatings/>}
    {active==="EditProfile" && <EditProfile/>}
    {active==="Forget" && <ForgetInstructor/>}
    {active==="CreateExam" && <CreateExam/>}

    </React.Fragment>

    
  
}

export default InstructorHome
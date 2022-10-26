import React, { useState } from 'react'
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import {Link} from 'react-router-dom';
import AddInstructor from '../components/Admin/AddInstructor';
import AddCorpTrainee from '../components/Admin/AddCorpTrainee';
import AddAdmin from '../components/Admin/AddAdmin';

const AdminHome = () => {
  const [active,isActive]=useState();
  return <React.Fragment>
    <AppBar sx={{background:'#B73E3E'}} position='sticky' >
    <Toolbar>
      <Typography variant="h5">MyCourses</Typography>
      <Box>
        <Tabs>
          <Tab label="Add Instructor" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("AddInst")}/> 
          <Tab label="Add Corporate Trainee" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("AddCorpTrainee")}/> 
          <Tab label="Add Admin" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("AddAdmin")}/> 
        </Tabs>
      </Box>
    </Toolbar>
  </AppBar>
  {active==="AddInst" && <AddInstructor/>}
  {active==="AddCorpTrainee" && <AddCorpTrainee/>}
  {active==="AddAdmin" && <AddAdmin/>}
  </React.Fragment>
}

export default AdminHome
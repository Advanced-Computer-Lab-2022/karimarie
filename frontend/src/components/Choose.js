import React from 'react'
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import {Link} from 'react-router-dom';
const Choose = () => {
  return (
    <div>
        <Button variant="contained" LinkComponent={Link} to="/InstructorHome" >Instructor</Button>
        <Button variant="contained" LinkComponent={Link} to="/AdminHome">Admin</Button>
        <Button variant="contained" LinkComponent={Link} to="/Home">Trainee</Button>
        <Button variant="contained" LinkComponent={Link} to="/CorpTraineeHome">corporateTrainee</Button>
    </div> 
  )
}

export default Choose
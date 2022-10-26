import React from 'react'
import AddCourse from '../components/Insructor/AddCourse';
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import{ useState } from 'react'
const InstructorHome = () => {
    const [active,isActive]=useState();
  return <React.Fragment>
     <AppBar sx={{background:'#B73E3E'}} position='sticky' >
     <Toolbar>
     <Typography variant="h5">Instructor</Typography>
     <Box>
        <Tabs>
          <Tab label="Add Course" display="flex" sx={{marginLeft:'45px'}} onClick={()=>isActive("AddCourse")}/> 
        </Tabs>
      </Box>
      </Toolbar>
      </AppBar>
    {active==="AddCourse" && <AddCourse/>}
    </React.Fragment>

    
  
}

export default InstructorHome
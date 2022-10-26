import React from 'react'
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import {Link} from 'react-router-dom';
const Header = () => {
  return <AppBar sx={{background:'#B73E3E'}} position='sticky' >
    <Toolbar>
      <Typography variant="h5">MyCourses</Typography>
      <Box>
        <Tabs>
          <Tab LinkComponent={Link} to="/Home" label="My Courses" display="flex" sx={{marginLeft:60}}/> 
        </Tabs>
      </Box>
      <Box display="flex" marginLeft="auto" >
        <Button sx={{margin:1}}>Logout</Button>
        
      </Box>
    </Toolbar>
  </AppBar>
  
}

export default Header
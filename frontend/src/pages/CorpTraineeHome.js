import React from 'react'
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import{ useState } from 'react'
import GetCourses from '../components/CorpTrainee/GetCourses';
const CorpTraineeHome = () => {
    const [active,isActive]=useState();
    return <React.Fragment>
    <GetCourses/>
      </React.Fragment>
}

export default CorpTraineeHome
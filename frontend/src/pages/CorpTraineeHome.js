import React from 'react'
import {AppBar, Typography,Toolbar, Button,Box, Tabs,Tab} from '@mui/material'
import{ useState } from 'react'
import GetCourses from '../components/CorpTrainee/GetCourses';
import AllCourses from '../components/AllCourses';
const CorpTraineeHome = () => {
    const [chooseC,setChoose]=useState('CorpTrainee');
    return <React.Fragment>
    <AllCourses chooseC={chooseC}/>
      </React.Fragment>
}

export default CorpTraineeHome
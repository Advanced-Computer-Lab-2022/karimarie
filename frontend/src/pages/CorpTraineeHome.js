import React from 'react'
import{ useState } from 'react'
import AllCourses from '../components/AllCourses';
const CorpTraineeHome = () => {
    const [chooseC,setChoose]=useState('CorpTrainee');
    return <React.Fragment>
    <AllCourses chooseC={chooseC}/>
      </React.Fragment>
}

export default CorpTraineeHome
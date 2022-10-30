import React, { Fragment } from 'react'
import {BrowserRouter} from 'react-router-dom';
import {Route,Routes} from 'react-router-dom';
import AllCourses from './AllCourses'
import Choose from './Choose';
import AddInstructor from './Admin/AddInstructor';
import AdminHome from '../pages/AdminHome';
import InstructorHome from '../pages/InstructorHome';
import CorpTraineeHome from '../pages/CorpTraineeHome';
import FilterPrice from './Filter/FilterPrice';
import CourseDetails from '../pages/CourseDetails';
import Countries from '../pages/Countries';

const App = () => {
  return <React.Fragment>
    {/* <header>
      <Header/>
    </header> */}
    <main>
      <Routes>
        <Route path="/" element={<Countries/>}/>
        <Route path="/Choose" element={<Fragment> <Choose/> <AllCourses/></Fragment>}/>
        <Route path="/Home" element={<AllCourses/>}/>
        <Route path="/AdminHome" element={<AdminHome/>}/>
       // <Route path="/InstructorHome" element={<InstructorHome/>}/>
        <Route path="/CorpTraineeHome" element={<CorpTraineeHome/>}/>
        <Route path="/course/:id/:newPrice/:currencyP" element={<CourseDetails/>} />
      </Routes>
    </main>
  </React.Fragment>
 
}

export default App

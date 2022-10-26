import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import {Route,Routes} from 'react-router-dom';
import Header from './Header'
import AllCourses from './AllCourses'
import Choose from './Choose';
import AddInstructor from './Admin/AddInstructor';
import AdminHome from '../pages/AdminHome';
import InstructorHome from '../pages/InstructorHome';
import CorpTraineeHome from '../pages/CorpTraineeHome';
const App = () => {
  return <React.Fragment>
    {/* <header>
      <Header/>
    </header> */}
    <main>
      <Routes>
        <Route path="/" element={<Choose/>}/>
        <Route path="/Home" element={<AllCourses/>}/>
        <Route path="/AdminHome" element={<AdminHome/>}/>
       // <Route path="/InstructorHome" element={<InstructorHome/>}/>
        <Route path="/CorpTraineeHome" element={<CorpTraineeHome/>}/>
      </Routes>
    </main>
  </React.Fragment>
 
}

export default App

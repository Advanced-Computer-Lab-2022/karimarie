import React, { Fragment } from 'react'
import {BrowserRouter} from 'react-router-dom';
import {Route,Routes} from 'react-router-dom';
import AllCourses from './AllCourses'
import Choose from './Choose';
import InstructorHome from '../pages/InstructorHome';
import CorpTraineeHome from '../pages/CorpTraineeHome';
import FilterPrice from './Filter/FilterPrice';
import CourseDetails from '../pages/CourseDetails';
import Countries from '../pages/Countries';
import RateCourse from './Trainee/RateCourse';
import ForgetPasswordInstructor from '../pages/ForgetPasswordInstructor';
import ForgetPass from '../components/ForgetPass';
import ForgetPasswordAll from '../pages/ForgetPasswordAll';
import McqQuiz from './Insructor/Quiz/McqQuiz';
import CourseCard from '../S3_components/CourseCard';
import HomePage from '../S3_components/HomePage';
import FilterSearchPage from '../S3_components/FilterSearchPage';
import SignUp from '../S3_components/SignUp';
import Login from '../S3_components/Login';
import InstructorHomePage from '../InstructorHome/InstructorHomePage';
import ForgetPassword from '../S3_components/ForgetPassword';
import InstProfile from '../InstructorHome/InstProfile';
import Start from '../pages/Admin/Start';
import CR from './Admin/CR';
import Watch from './Trainee/Watch';
import TandC from './TandC';
const App = () => {
  console.log('hooo')
  return <React.Fragment>
    {/* <header>
      <Header/>
    </header> */}
    <main>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Choose" element={<Fragment> <Choose/> <AllCourses/></Fragment>}/>
        <Route path="/Home" element={<AllCourses/>}/>
       // <Route path="/InstructorHome" element={<InstructorHome/>}/>
        <Route path="/CorpTraineeHome" element={<CorpTraineeHome/>}/>
        <Route path="/course/:id/:newPrice/:currencyP/:type" element={<CourseDetails/>} />
        <Route path="/forgetpasswordInstructor" element={<ForgetPasswordInstructor/>} />
        <Route path="/forgetpasswordAll" element={<ForgetPasswordAll/>} />
        <Route path="/myExam/:CourseId" element={<McqQuiz/>} />
        <Route path="/dropdownCountry" element={<Countries/>} />
        <Route path="/FilterSearchPage" element={<FilterSearchPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/InstructorHomePage" element={<InstructorHomePage/>} />
        <Route path="/ForgetPassword" element={<ForgetPassword/>} />
        <Route path="/profile" element={<InstProfile/>} />
        <Route path="/hii" element={<Start/>} />
        <Route path="/bye" element={<Watch/>} />
        <Route path="/b" element={<TandC/>} />

      </Routes>
    </main>
  </React.Fragment>
 
}

export default App

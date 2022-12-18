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
import ViewReviewsInst from "../InstructorHome/ViewReviewsInst"
import ShowCourseDetails from '../S3_components/ShowCourseDetails';
import GetInstProfile from "../S3_components/GetInstProfile"
import TraineeHomePage from "../TraineeHome/TraineeHomePage"
import ForgetPasswordForm from '../S3_components/ForgetPasswordForm';
import Watch from '../TraineeHome/Watch';
import VMyCourses from '../TraineeHome/VMyCourses';
import ViewMyReports from '../TraineeHome/ViewMyReports';

const App = () => {
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
        <Route path="/course/:id/:newPrice/:currencyP/:type/:type2/:priceafter" element={<ShowCourseDetails/>} />
        <Route path="/forgetpasswordInstructor" element={<ForgetPasswordInstructor/>} />
        <Route path="/forgetpasswordAll" element={<ForgetPasswordAll/>} />
        <Route path="/myExam/:CourseId" element={<McqQuiz/>} />
        <Route path="/dropdownCountry" element={<Countries/>} />
        <Route path="/FilterSearchPage" element={<FilterSearchPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/InstructorHomePage" element={<InstructorHomePage/>} />
        <Route path="/TraineeHomePage" element={<TraineeHomePage/>} />
        <Route path="/ForgetPassword" element={<ForgetPassword/>} />
        <Route path="/profile" element={<InstProfile/>} />
        <Route path="/instprofile/:id/:userType" element={<GetInstProfile/>} />
        <Route path="/hii" element={<Start/>} />
        <Route path="/ViewMyRatings" element={<ViewReviewsInst/>} />
        <Route path="/Trainee" element={<TraineeHomePage/>} />
        <Route path="/forgetpasswordform/:id" element={<ForgetPasswordForm/>} />
        <Route path="/Bye/:id/:instructor" element={<Watch/>} />
        <Route path="/Mycourses" element={<VMyCourses/>} />
        <Route path="/viewMyR/:id" element={<ViewMyReports/>} />
      </Routes>
    </main>
  </React.Fragment>
 
}

export default App

import React, { Fragment } from 'react'
import {BrowserRouter} from 'react-router-dom';
import {Route,Routes} from 'react-router-dom';
import McqQuiz from './Insructor/Quiz/McqQuiz';
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
import TermsConditions from '../S3_components/TermsConditions';
import Contract from '../S3_components/Contract';
import PayCredit from "../TraineeHome/PayCredit";
import ReactGA from "react-ga"

const App = () => {
  const Tracking_ID="UA-252625280-1"
  ReactGA.initialize(Tracking_ID);
  
  return <React.Fragment>
    {/* <header>
      <Header/>
    </header> */}
    <main>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/InstructorHomePage" element={<InstructorHomePage/>} />
        <Route path="/profile" element={<InstProfile/>} />
        <Route path="/Terms&Conditions" element={<TermsConditions/>} />
        <Route path="/Contract" element={<Contract/>} />
        <Route path="/TraineeHomePage" element={<TraineeHomePage/>} />
        <Route path="/FilterSearchPage" element={<FilterSearchPage/>} />
        <Route path="/Trainee" element={<TraineeHomePage/>} />


       
        

        <Route path="/course/:id/:newPrice/:currencyP/:type/:type2/:priceafter" element={<ShowCourseDetails/>} />
        <Route path="/myExam/:CourseId" element={<McqQuiz/>} />
      
        <Route path="/ForgetPassword" element={<ForgetPassword/>} />
        <Route path="/instprofile/:id/:userType" element={<GetInstProfile/>} />
        <Route path="/hii" element={<Start/>} />
        <Route path="/ViewMyRatings" element={<ViewReviewsInst/>} />
        <Route path="/forgetpasswordform/:id" element={<ForgetPasswordForm/>} />
        <Route path="/Bye/:id/:instructor" element={<Watch/>} />
        <Route path="/Mycourses" element={<VMyCourses/>} />
        <Route path="/viewMyR/:id" element={<ViewMyReports/>} />
        
        <Route path="/PayCredit/:id/:currencyPrice" element={<PayCredit />} />
      </Routes>
    </main>
  </React.Fragment>
 
}

export default App

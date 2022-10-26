import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import AllCourses2 from './AllCourses2';
import { Typography } from '@mui/material';
import FilterSubject from './Filter/FilterSubject';
const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [subjectList, setSubjectList] = useState([]);//list of subjects
  const [filterResult,setFilterResult]=useState([]);
  const [isToggled,setToggled]=useState(true)
  
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:2000/home")
      .catch((err) => console.log(err));
      const data = await res.data;

      return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setCourses(data.courses));
    
  }, []);
  const sendRequest2 = async () => {
    const res = await axios
      .get("http://localhost:2000/subjects")
      .catch((err) => console.log(err));
      const data = await res.data;

      return data;
  };
  useEffect(() => {
    sendRequest2().then((data) => setSubjectList(data.subjects));
    
  }, []);
  const handleChange = (event) =>{
    console.log(event.target.value);
    setFilterResult(event.target.value);
    setToggled(false);
}
  
  return (
    <React.Fragment>
     <Typography>Choose Subject</Typography>
     <select className="form-control" value={filterResult} onChange={handleChange}>
              <option value="">Choose A Subject</option>

        {subjectList.map(subject => (
              <option value={subject.title} key={subject.id} >{subject.title}</option>
    
              ))
              }

          </select>
    <div>
    {isToggled && courses &&
      courses.map((courses) => (
        <AllCourses2
          title={courses.title}
          price={courses.price}
          totalHours={courses.totalHours}
        />
      ))}
  </div>
  <div>
      {!isToggled && <FilterSubject
      subject={filterResult}/>}
  </div>
 
  </React.Fragment>
);
};
  


export default AllCourses;
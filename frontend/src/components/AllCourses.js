import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import AllCourses2 from './AllCourses2';
import { Button, Typography } from '@mui/material';
import FilterSubject from './Filter/FilterSubject';
import FilterPrice from './Filter/FilterPrice';
const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setClearFilter] = useState(false);
  const [subjectList, setSubjectList] = useState([]);//list of subjects
  const [filterResult,setFilterResult]=useState();
  const [price,setPrice]=useState();
  const [temp,setTemp]=useState();
  const [isToggled,setToggled]=useState(true)
  const [choose,setChoose]=useState('All');
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setClearFilter(true);
    setChoose('Price')

  };
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
   // setToggled(false);
    setClearFilter(true);
    setChoose('Subject')
}
const clearFilter=()=>{
  setFilterResult('');
  setPrice('')
  //setToggled(true);
  setClearFilter(false);
  setChoose('All')
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
          <form className="create" onSubmit={handleSubmit}> 
      <h3>Filter by Price</h3>
      <input 
        type="text" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
      /> <button>Filter</button>
      </form>
     <div>
    {choose==="All" && courses &&
      courses.map((courses) => (
        <AllCourses2
          id={courses._id}
          title={courses.title}
          price={courses.price}
          totalHours={courses.totalHours}
          
        />
      ))}
  </div>
  <p>{filterResult}</p>
  <div>
      {choose==="Subject" && <FilterSubject
      subject={filterResult}/>  }
  </div> 
  <div>
  {choose==="Price" && <FilterPrice
      price={price}/>  }
  </div>
  {filter&&<Button onClick={clearFilter}>Clear Filter</Button>}   
  </React.Fragment>
);
};
  


export default AllCourses;
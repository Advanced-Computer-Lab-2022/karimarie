import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
//import AllCourses2 from '../AllCourses2';
import { Button, Typography } from '@mui/material';

import FilterSubject from './FilterInst/FilterSubject';
import FilterPrice from './FilterInst/FilterPrice';
import SearchCourseInst from './FilterInst/SearchCourseInst';

const SearchFilter = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setClearFilter] = useState(false);
  const [subjectList, setSubjectList] = useState([]);//list of subjects
  const [filterResult,setFilterResult]=useState();
  const [price,setPrice]=useState();
  const [instructor,setInstructor]=useState();
  const [instructor1,setInstructor1]=useState();
  const [instructor2,setInstructor2]=useState();
 
  const [search,setSearch]=useState();
 
  const [choose,setChoose]=useState('');
  const country=localStorage.getItem("country");
  const [currencyFilter,setCurrencyFilter]= useState('')
  // useEffect(()=>{
  //         if (country==="Egypt"){
  //           setCurrencyFilter('EGP')
  //       }
  //       else if (country==="Europe"){
  //           setCurrencyFilter('EUR')
  //     }
  //     else if (country==="USA"){
  //           setCurrencyFilter('USD')
  //     }
  //     },[])

  // const sendRequest = async () => {
  //   const res = await axios
  //     .get("http://localhost:2000/instructor/instCourses/:id")
  //     .catch((err) => console.log(err));
  //     const data = await res.data;

  //     return data;
  // };
  // useEffect(() => {
  //   sendRequest().then((data) => setCourses(data.courses));
    
  // }, []);
  const handleSubmitPrice = (e) => {
    e.preventDefault();
    setClearFilter(true);
    setChoose('Price')

  };
  
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setClearFilter(true);
    setChoose('Search')

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
    setFilterResult(event.target.value);
   // setToggled(false);
    //setClearFilter(true);
    
    
   
}

const clearFilter=()=>{
  setFilterResult('');
  setPrice('')
  setSearch('')
  setInstructor('')
  setInstructor1('')
  setInstructor2('')
  //setToggled(true);
  setClearFilter(false);
  setChoose('')
}
const handleSubmitSubject=(e)=>{
  setChoose('Subject');
  e.preventDefault();
    setClearFilter(true);

}

  
  return (
    <React.Fragment>
      <Typography>Choose Subject</Typography>
      <form className="create" onSubmit={handleSubmitSubject}>
     <select className="form-control" value={filterResult} onChange={handleChange}>
              <option value="">Choose A Subject</option>
        {subjectList.map(subject => (
              <option value={subject.title} key={subject._id} >{subject.title}</option>
              ))
              }
          </select> 
          <h3>Enter Your ID :</h3>
      <input 
        type="text" 
        onChange={(e) => setInstructor2(e.target.value)} 
        value={instructor2}
      /> <button >Filter</button>
          </form>

          <form className="create" onSubmit={handleSubmitPrice} > 
      <h3>Filter by Price</h3>
      <input 
        type="text" 
        placeholder={`Enter Price in ${currencyFilter}`}
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
      /> 
      <h3>Enter Your ID :</h3>
      <input 
        type="text" 
        onChange={(e) => setInstructor(e.target.value)} 
        value={instructor}
      /> <button >Filter</button>
  </form>

  

      
      <form className="create" onSubmit={handleSubmitSearch} > 
      <h3>Search for Courses </h3>
      <input 
        type="text" 
        onChange={(e) => setSearch(e.target.value)} 
        value={search}
      /> 
      <h3>Enter Your ID :</h3>
      <input 
        type="text" 
        onChange={(e) => setInstructor1(e.target.value)} 
        value={instructor1}
      />
      <button>Search</button>
      </form>



     {/* <div>
    {choose==="All" && courses &&
      courses.map((courses) => (
        <AllCourses2
          id={courses._id}
          title={courses.title}
          price={courses.price}
          totalHours={courses.totalHours}
          rating={courses.rating}
          
          
        />
      ))}
  </div> */}
  <p>{filterResult}</p>
  <div>
      {choose==="Subject" && <FilterSubject
      subject={filterResult} instructor={instructor2} />  }
  </div> 
  <div>
  {choose==="Price" && <FilterPrice
      price={price} instructor={instructor} currencyFilter={currencyFilter}/>  }
  </div>
  
  <div>
  {choose==="Search" && <SearchCourseInst
      search={search} instructor={instructor1}/>  }
  </div>
  {filter&&<Button onClick={clearFilter}>Clear Filter</Button>}   
  </React.Fragment>
);
};
  


export default SearchFilter;
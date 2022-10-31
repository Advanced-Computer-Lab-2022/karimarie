import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import AllCourses2 from './AllCourses2';
import { Button, Typography } from '@mui/material';
import FilterSubject from './Filter/FilterSubject';
import FilterPrice from './Filter/FilterPrice';
import FilterRating from './Filter/FilterRating';
import FilterBoth from './Filter/FilterBoth';
import SearchCourse from './SearchCourse';
const AllCourses = (chooseC) => {
  const [courses, setCourses] = useState([]);
  const [filter, setClearFilter] = useState(false);
  const [subjectList, setSubjectList] = useState([]);//list of subjects
  const [filterResult,setFilterResult]=useState();
  const [price,setPrice]=useState();
  const [rating,setRating]=useState();
  const [search,setSearch]=useState();
  const [temp,setTemp]=useState();
  const [isToggled,setToggled]=useState(true)
  const [choose,setChoose]=useState('All');
  const [rating2,setRating2]=useState();
  const [subject2,setSubject2]=useState();
  const[chooseCopr,setChooseC]=useState(chooseC)
  const [showText, setShowText] = useState(true);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:2000/home")
      .catch((err) => console.log(err));
      const data = await res.data;

      return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setCourses(data.courses));
    if(chooseCopr.chooseC=='CorpTrainee'){
      setShowText(false);
    }
    
  }, []);
  const handleSubmitPrice = (e) => {
    e.preventDefault();
    setClearFilter(true);
    setChoose('Price')
    console.log(price)

  };
  const handleSubmitRating = (e) => {
    e.preventDefault();
    setClearFilter(true);
    setChoose('Rating')

  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setClearFilter(true);
    setChoose('Search')

  };
  const  handleSubmitBoth = (e) => {
    e.preventDefault();
    setClearFilter(true);
    setChoose('Both')

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
    setClearFilter(true);
    setChoose('Subject')
}
const clearFilter=()=>{
  setFilterResult('');
  setPrice('')
  setRating('')
  setSearch('')
  setSubject2('')
  setRating2('')
  //setToggled(true);
  setClearFilter(false);
  setChoose('All')
};
const Text = () =>
<form className="create" onSubmit={handleSubmitPrice} > 
      <h3>Filter by Price</h3>
      <input 
        type="Number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
      /> <button >Filter</button>
  </form>

  
  return (
    <React.Fragment>
      <Typography>Choose Subject</Typography>
     <select className="form-control" value={filterResult} onChange={handleChange}>
              <option value="">Choose A Subject</option>
        {subjectList.map(subject => (
              <option value={subject.title} key={subject._id} >{subject.title}</option>
              ))
              }

          </select> 
          
          {showText ? <Text/> : null}

          

      <form className="create" onSubmit={handleSubmitRating} > 
      <h3>Filter by Rating</h3>
      <input 
        type="text" 
        onChange={(e) => setRating(e.target.value)} 
        value={rating}
      /> <button>Filter</button>
      </form>
      
      <form className="create" onSubmit={handleSubmitSearch} > 
      <h3>Search for Courses </h3>
      <input 
        type="text" 
        onChange={(e) => setSearch(e.target.value)} 
        value={search}
      /> <button>Search</button>
      </form>

      <form className="create" onSubmit={handleSubmitBoth}> 
      <h3>Filter by Rating and Subject</h3>
      <input 
        type="Number" placeholder='Enter A rating'
        onChange={(e) => setRating2(e.target.value)} 
        value={rating2}
      />
      <input 
        type="text" placeholder='Enter A Subject'
        onChange={(e) => setSubject2(e.target.value)} 
        value={subject2}
      />
       <button>Filter</button>
      </form>



     <div>
    {chooseCopr.chooseC!=='CorpTrainee' && choose==="All" && courses &&
      courses.map((courses) => (
        <AllCourses2
          id={courses._id}
          title={courses.title}
          price={courses.price}
          totalHours={courses.totalHours}
          rating={courses.rating}
          currency={courses.currency}
          
          
        />
      ))}
  </div>
  <div>
    {chooseCopr.chooseC==='CorpTrainee' && choose==="All" && courses &&
      courses.map((courses) => (
        <AllCourses2
          id={courses._id}
          title={courses.title}
          totalHours={courses.totalHours}
          rating={courses.rating}
          
          
        />
      ))}
  </div>
  <p>{filterResult}</p>
  <div>
      {choose==="Subject" && <FilterSubject
      subject={filterResult} show={chooseCopr.chooseC}/>  }
  </div> 
  <div>
  {choose==="Price" && <FilterPrice
      price={price}/>  }
  </div>
  <div>
  {choose==="Rating" && <FilterRating
      rating={rating} show={chooseCopr.chooseC}/>  }
  </div>
  <div>
  {choose==="Search" && <SearchCourse
      search={search} show={chooseCopr.chooseC}/>  }
  </div>
  <div>
    {choose==="Both" && <FilterBoth
    subject={subject2}
    rating={rating2}
    show={chooseCopr.chooseC}/>}
  </div>
  {filter&&<Button onClick={clearFilter}>Clear Filter</Button>}   
  </React.Fragment>
);
};
  


export default AllCourses;
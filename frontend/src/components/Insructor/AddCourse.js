import { useState } from 'react'
import { Typography } from '@mui/material'
import React from 'react'
import { useEffect } from "react";
import axios from "axios";

const AddCourse = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [totalHours, setTotalHours] = useState('')
  const [resultingSubject, setResultingSubject] = useState('') //egabt el walad
  const [subject, setSubject] = useState([]) //loop 3ala db el subjects
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState('')
  const [subtitles, setSubtitles] = useState('')
  const [error, setError] = useState(null)

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:2000/subjects")
      .catch((err) => console.log(err));
      const data = await res.data;
      return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setSubject(data.subjects));
    
  }, []);
  const handleChange = (event) =>{
    console.log(event.target.value);
    setResultingSubject(event.target.value);
}
  const sendRequest2 = async () => {
    const res = await axios
      .post("http://localhost:2000/instructor/addCourse", {
        title: title,
        price:price,
        totalHours:totalHours,
        subject:resultingSubject,
        description:description,
        instructor:instructor,
        subtitles:subtitles
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest2();
     
  };

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Course</h3>

      <label>Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Price:</label>
      <input 
        type="number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
      />

      <label>Total Hours:</label>
      <input 
        type='number' 
        onChange={(e) => setTotalHours(e.target.value)} 
        value={totalHours} 
      />
     <Typography>Choose Subject</Typography>
     <select className="form-control" value={resultingSubject} onChange={handleChange}>
              <option value="">Choose A Subject</option>

        {subject.map(subject => (
              <option value={subject.title} key={subject.id} >{subject.title}</option>
    
              ))
              }

          </select>

   


      <label>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description} 
      />

      <label>Instructor's username:</label>
      <input 
        type="text" 
        onChange={(e) => setInstructor(e.target.value)} 
        value={instructor} 
      />
      <label>Course subtitles:</label>
      <input 
        type="text" 
        onChange={(e) => setSubtitles(e.target.value)} 
        value={subtitles} placeholder="please enter subtitles seperated by a comma"
      />

      <button>Add Course</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddCourse;
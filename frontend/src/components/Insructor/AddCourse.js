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
  const [currency, setCurrency] = useState('EGP')
  const [preview,setPreview]=useState('')

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
    //console.log(event.target.value);
    setResultingSubject(event.target.value);
}
  const sendRequest2 = async () => {
    //console.log(inputList)
    const res = await axios
      .post("http://localhost:2000/instructor/addCourse", {
        title: title,
        price:price,
        totalHours:totalHours,
        subject:resultingSubject,
        description:description,
        instructor:instructor,
        subtitles:inputList,
        currency:currency,
        preview:preview,
        originalPrice:price
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest2();
     
  };


  const [inputList, setinputList]= useState([{ title:'', Video:'',totalHours:'',shortDescrip:''}]);
  const handleinputchange=(e, index)=>{
    const {name, value}= e.target;
    const list= [...inputList];
    list[index][name]= value;
    setinputList(list);

  }
 
  const handleremove= index=>{
    const list=[...inputList];
    list.splice(index,1);
    setinputList(list);
  }

  const handleaddclick=()=>{ 
    setinputList([...inputList, { title:'', Video:'',totalHours:'',shortDescrip:''}]);
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Course</h3>

      <label>Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Preview:</label>
        <input 
        type="text" 
        onChange={(e) => setPreview(e.target.value)} 
        value={preview}
      />

      <label>Price:</label>
      <input 
        type="number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
      />
      <select
        className="custom-select"
        value={currency}
        onChange={(e) => {
          const selectedCurr = e.target.value;
          setCurrency(selectedCurr );
        }}
      >
        <option value="EGP">EGP</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>

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

      <label>Instructor's ID:</label>
      <input 
        type="text" 
        onChange={(e) => setInstructor(e.target.value)} 
        value={instructor} 
      />
      
     <div className="row">
       <div className="col-sm-12">
         <h5 className="mt-3 mb-4 fw-bold">Add Subtitles : </h5>
           
            { 
            inputList.map( (x,i)=>{
              return(
              <div className="row mb-3">
                 <div class="form-group col-md-4">
                 <label >Subtitle Name:</label>
                  <input type="text"  name="title" class="form-control"  placeholder="Enter Subtitle" onChange={ e=>handleinputchange(e,i)} />
               </div>
               <div class="form-group col-md-4">
               <label >Total Hours :</label>
                  <input type="Number"  name="totalHours" class="form-control"   placeholder="Enter TotalHours" onChange={ e=>handleinputchange(e,i) }/>
               </div>
               <div class="form-group col-md-4">
               <label >Video  :</label>
                  <input type="text"  name="Video" class="form-control"   placeholder="Enter Video" onChange={ e=>handleinputchange(e,i) }/>
               </div>
               <div class="form-group col-md-4">
               <label >Short Description  :</label>
                  <input type="text"  name="shortDescrip" class="form-control"   placeholder="Enter shortDescrip" onChange={ e=>handleinputchange(e,i) }/>
               </div>
               <div class="form-group col-md-2 mt-4">
               {
                  inputList.length!==1 &&
                  <button  className="btn btn-danger mx-1" onClick={()=> handleremove(i)}>Remove</button>
               }
               { inputList.length-1===i &&
               <button  className="btn btn-success" onClick={ handleaddclick}>Add More</button>
               }
               </div>
            </div>
              );
             } )} 

               
       </div>
     </div>
    

      <button>Add Course</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddCourse;
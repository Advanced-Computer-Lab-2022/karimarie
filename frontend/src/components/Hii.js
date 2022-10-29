
import React, { useState } from 'react';
import axios from 'axios'

 const Hii = () => {
    const[name,setName] =useState('')
    const[gender,setGender] =useState('')
    const[username,setUsername] =useState('')
    const[password,setPass] =useState('')
    const[email,setEmail] =useState('')

    const addInst = async () => {
        console.log("boodaa")
        const res = await axios
          .post("http://localhost:2000/admin/addI", {
            name:name,password:password,gender:gender,email:email,username:username
          })
          .catch((err) => console.log(err));
        const data = await res.data;
        return data;
      };
      const handleI=()=>{
        console.log("boodaa")

        addInst().then((data) => console.log(data))
      }
  return (
    <div>
    <h3>
        Adding Instructor
    </h3>
    <form onSubmit={addInst}>
    <label> Name</label>
    <input type="text" 
    onChange={(e) => setName(e.target.value)}
    value={name}
    
    className="form-control" 
    
    aria-describedby="emailHelp" 
    placeholder="Enter your first name"
    />
    
    <label>username</label>
    <input 
    onChange={(e) => setUsername(e.target.value)}
    value={username}
    
    className="form-control" 
     
    aria-describedby="emailHelp" 
    placeholder="Enter email"
    />
    <label >Password</label>
    <input type="password" 
    onChange={(e) => setPass(e.target.value)}
    value={password}
    
    className="form-control" 
     
    placeholder="Password"
    />
    <label>Email address</label>
    <input type="email" 
    onChange={(e) => setEmail(e.target.value)}
    value={email}
    
    className="form-control" 
     
    aria-describedby="emailHelp" 
    placeholder="Enter email"
    />

<label> Gender</label>
    <input type="text" 
    onChange={(e) => setGender(e.target.value)}
    value={gender}
    
    className="form-control" 
    
    aria-describedby="emailHelp" 
    placeholder="Enter your gender"
    />

    <button>
        Add Instructor
    </button>
    </form>



    </div>
  )
}
 export default Hii;
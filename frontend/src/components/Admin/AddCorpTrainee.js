import { useState } from 'react'
import axios from "axios";

const AddCorpTrainee = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastname] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('') 
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    sendRequest()
      .then((data) => console.log(data))
      setError(null)
      setFirstName('')
      setLastname('')
      setUserName('')
      setPassword('')
      setEmail('')
  }
    const sendRequest = async () => {
      const res = await axios
        .post("http://localhost:2000/admin/addCorpTrainee", {
          firstName: firstName,
          lastName:lastName,
          userName:userName,
          password:password,
          email:email
        })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };
    

  

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Corporate Trainee</h3>

      <label>First Name:</label>
      <input 
        type="text" 
        onChange={(e) => setFirstName(e.target.value)} 
        value={firstName}
      />

      <label>Last Name:</label>
      <input 
        type="text" 
        onChange={(e) => setLastname(e.target.value)} 
        value={lastName}
      />

      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUserName(e.target.value)} 
        value={userName} 
      />

      <label>Password:</label>
      <input 
        type="text" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <label>Email:</label>
      <input 
        type="text" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />

      <button>Add Corporate Trainee</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddCorpTrainee;
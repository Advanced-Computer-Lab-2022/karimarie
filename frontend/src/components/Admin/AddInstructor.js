import { useState } from 'react'

const AddInstructor = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastname] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const instructor = {firstName, lastName, userName,password}
    
    const response = await fetch('/admin/addInst', {
      method: 'POST',
      body: JSON.stringify(instructor),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setFirstName('')
      setLastname('')
      setUserName('')
      setPassword('')
      console.log('new instructor added:', json)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Instructor</h3>

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

      <button>Add Instructor</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddInstructor;
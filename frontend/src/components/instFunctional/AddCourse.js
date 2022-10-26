import { useState } from 'react'

const AddCourseForm = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [totalHours, setTotalHours] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const course = {title, price, totalHours,subject,description,instructor}
    
    const response = await fetch('/instructor/addCourse', {
      method: 'POST',
      body: JSON.stringify(course),
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
      setTitle('')
      setPrice('')
      setTotalHours('')
      setSubject('')
      setDescription('')
      setInstructor('')
      console.log('new course added:', json)
    }

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

      <label>Subject:</label>
      <input 
        type="text" 
        onChange={(e) => setSubject(e.target.value)} 
        value={subject} 
      />

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

      <button>Add Course</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddCourseForm;
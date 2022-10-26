import { useState } from 'react'


const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)


const handleSubmit = async (e) => {
    e.preventDefault()

    const loggedinUser = {userName,password}
    
    const response = await fetch('/login/login', {
      method: 'POST',
      body: JSON.stringify(loggedinUser),
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
      setUserName('')
      setPassword('')
      console.log('instructor logged in', json)
    }

  }
    return ( 
    
    <div className="form">
      <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUserName(e.target.value)} 
        value={userName} 
        required
      />

      <label>Password:</label>
      <input 
        type="text" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        required
      />
      <button>Login</button>
      {error && <div className="error">{error}</div>}


      </form>
    </div>
 
     );
}
 
export default Login;
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [passowrd, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(email, passowrd)
  }

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h3>Log in</h3>
      
      <label>Email:</label>
      <input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Passowrd:</label>
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={passowrd}
      />

      <button>Log in</button>
    </form>
  )
}

export default Login
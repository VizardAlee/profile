import { useState } from 'react'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [passowrd, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(email, passowrd)
  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      
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

      <button>Sign up</button>
    </form>
  )
}

export default Signup
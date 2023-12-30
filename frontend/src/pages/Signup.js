import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [webSite, setWebSite] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(firstName, lastName, phoneNumber, email, password, businessName, businessAddress, webSite)
  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign up</h3>
    
      <label>First Name:</label>
      <input
        type='text'
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />

      <label>Last Name:</label>
      <input
        type='text'
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      <label>Phone Number:</label>
      <input
        type='text'
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
      />

      <label>Email:</label>
      <input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <label>Business Name:</label>
      <input
        type='text'
        onChange={(e) => setBusinessName(e.target.value)}
        value={businessName}
      />

      <label>Business Address:</label>
      <input
        type='text'
        onChange={(e) => setBusinessAddress(e.target.value)}
        value={businessAddress}
      />

      <label>Website:</label>
      <input
        type='text'
        onChange={(e) => setWebSite(e.target.value)}
        value={webSite}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup
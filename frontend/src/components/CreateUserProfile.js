import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const CreateUserProfile = () => {
  const { user, updateUser } = useAuthContext()
  const navigate = useNavigate()

  // State for form fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [webSite, setWebSite] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Make a fetch request to the server to update the user profile
      const response = await fetch(`/api/user/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          businessAddress,
          webSite,
        }),
      })

      const updatedProfile = await response.json()

      // Update the user with created profile
      updateUser({ ...user, profile: updatedProfile })

      navigate('/')
    } catch (error) {
      console.error('Error creating user profile:', error)
    }
  }
  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label>Business Address:</label>
        <input
          type="text"
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
        />

        <label>Website:</label>
        <input
          type="text"
          value={webSite}
          onChange={(e) => setWebSite(e.target.value)}
        />

        <button type='submit'>Update Profile</button>
      </form>
    </div>
  )
}

export default CreateUserProfile

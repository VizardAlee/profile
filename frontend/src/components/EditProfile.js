import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const EditProfile = ({ setEditing, handleUpdate }) => {
  const { user } = useAuthContext()
  const [editedData, setEditedData] = useState({})

  // Load existing user data into the form
  useEffect(() => {
    setEditedData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phoneNumber: user.phoneNumber || '',
      // email: user.email || '',
      // businessName: user.businessName || '',
      businessAddress: user.businessAddress || '',
      webSite:user.webSite || '',
    })
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedData((prevData) => ({ ...prevData, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Make a request to the backend
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(editedData),
      })

      if (response.ok) {
        // If the update is successful, trigger the handleUpdate function
        handleUpdate()
      } else {
        console.error('Failed to update user details')
      }
    } catch (error) {
      console.error('Error updating user details', error)
    }
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
          <label>
          First Name:
          </label>
          <input
            type='text'
            name='firstName'
            value={editedData.firstName}
            onChange={handleChange}
          />
          <label>
          Last Name:
          </label>
          <input
            type='text'
            name='lastName'
            value={editedData.lastName}
            onChange={handleChange}
          />
          <label>
          Phone Number:
          </label>
          <input
            type='text'
            name='phoneNumber'
            value={editedData.phoneNumber}
            onChange={handleChange}
          />
          <label>
          Business Address:
          </label>
          <input
            type='text'
            name='businessAddress'
            value={editedData.businessAddress}
            onChange={handleChange}
          />
          <label>
          Website:
          </label>
          <input
            type='text'
            name='webSite'
            value={editedData.webSite}
            onChange={handleChange}
          />
          <button type='submit'>Save Changes</button>
          <button onClick={() => setEditing(false)}>Cancel</button>

      </form>
    </div>
  )
}

export default EditProfile
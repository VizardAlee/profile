import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const EditProfile = ({ setEditing }) => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [loaded, setLoaded] = useState(false)
  const [editedData, setEditedData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phoneNumber: user.phoneNumber || '',
    businessAddress: user.businessAddress || '',
    webSite: user.webSite || '',
  })

  // Load existing user data into the form
  useEffect(() => {
    const fetchUserData =  async () => {
      try {
        // make request to your backend to fetch user details
        const response = await fetch('/api/user/details', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
        })

        if (response.ok) {
          const data = await response.json()
          setEditedData((prevData) => ({  ...prevData, ...data }))
          setLoaded(true)
        } else {
          console.error('Failed to fetch user details')
        }
      } catch (error) {
        console.error('Error fetching user details', error)
      }
    }
    if (user) {
      fetchUserData()
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedData((prevData) => ({ ...prevData, [name]: value}))
  }

  const handleUpdate = async () => {
    try {
      // Make a request to backend to fetch updated user details
      const response = await fetch('api/user/details', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      if (response.ok) {
        const updatedUserData = await response.json()
        setEditedData(updatedUserData)
        console.log('User details updated successfully')
      } else {
        console.error('Failed  to fetch updated user details')
      }
    } catch (error) {
      console.error('Error fetching updated user details', error)
    }
    setEditing(false)
    // fetchUserData()
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
        // Exit edit mode after updating
        // setEditing(false)
        // Navigate backt o user profile details page
         navigate('/profile')
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
      {loaded ? (
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
      ) : (
        <p>Loaded user data...</p>
      )}
    </div>
  )
}

export default EditProfile
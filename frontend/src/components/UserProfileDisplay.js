// UserProfileDetails.js
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';

const UserProfileDetails = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a request to your backend to fetch user details
        const response = await fetch('/api/user/details', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleUpdate = () => {
    setEditing(false)
    // fetchUserData()
  }

  return (
    <div>
      <h2>User Profile Details</h2>
      {editing ? (
        <EditProfile setEditing={setEditing} handleUpdate={handleUpdate} />
      ) : (
        <>
          {userData ? (
            <>
              <p>First Name: {userData.firstName}</p>
              <p>Last Name: {userData.lastName}</p>
              <p>Phone Number: {userData.phoneNumber}</p>
              <p>Email: {userData.email}</p>
              <p>Business Name: {userData.businessName}</p>
              <p>Business Address: {userData.businessAddress}</p>
              <p>Website: {userData.webSite}</p>
              <Link to="/">Return</Link>
              <Link to="/profile/edit" onClick={() => setEditing(true)}>Edit Profile</Link>
            </>
          ) : (
        <p>Loading user data...</p>
      )}
        </>
      )}
    </div>
  );
};

export default UserProfileDetails;

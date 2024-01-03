import { Link, NavLink } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState } from "react"

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [ userData, setUserData ] = useState(null)

  useEffect (() => {
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
    }
  
    if (user) {
      fetchUserData();
    }  
  }, [user])
  
  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Runnr Business</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span className="emailSpot">{userData ? `Welcome! ${userData.firstName}` : ''}</span>
              <NavLink to="/profile">
                Profile
              </NavLink>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
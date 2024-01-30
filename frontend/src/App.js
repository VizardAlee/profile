import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import ProductDetails from './components/ProductDetails';
import EditProduct from './components/EditProduct';
import EditProfile from './components/EditProfile';
// import UserProfile from './components/UserProfile';
// import CreateUserProfile from './components/CreateUserProfile';
import UserProfileDisplay from './components/UserProfileDisplay';
import { useState } from 'react';
function App() {
  const { user } = useAuthContext()
  const [, setEditing] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div  className='pages'>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/product/:productId"
              element={<ProductDetails />} // Use the ProductDetails component
            />
            <Route path='/products/:id/edit' element={<EditProduct />} />
            <Route
              path='/profile'
              element={
                user ? (
                  <>
                    {/* <UserProfile /> */}
                    <UserProfileDisplay setEditing={setEditing} />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path='/profile/update'
              element={
                user ? (
                  <EditProfile />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;

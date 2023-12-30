import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children })  => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [dispatch])

  console.log('AuthContext state: ', state)

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('api/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'applicaion/json',
          Authorization: `Bearer ${token}`,
        }
      })

      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'LOGIN', payload: { ...state.user, ...data } })
      }
    } catch (error) {
      console.error('Error  fetching user profile:', error)
    }
  }

  return (
    <AuthContext.Provider value={{...state, dispatch, fetchUserProfile}}>
      { children }
    </AuthContext.Provider>
  )
}
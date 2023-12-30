import { useState } from "react";
import { useAuthContext } from './useAuthContext'

const SIGNUP_API_ENDPOINT = '/api/user/signup'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] =  useState(null)
  const { dispatch } = useAuthContext()
 
  const signup = async (firstName, lastName, phoneNumber, email, password, businessName, businessAddress, webSite) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(SIGNUP_API_ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstName, lastName, phoneNumber, email, password, businessName, businessAddress, webSite})
      })
      const json = await response.json()
  
      if (response.ok) {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json))
  
        // update the auth context
        dispatch({type: 'LOGIN', payload: json})
      } else {
        // Handle specific error scenarios
        if (response.status === 400) {
          setError('Invalid email or passowrd')
        } else if (response.status === 409) {
          setError('Email already in use')
        } else {
          setError('Something went wrong. Please try again.')
        }
      }  
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error}
}
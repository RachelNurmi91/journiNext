"use client"

import Input from "@components/segments/Input"
import { useState, useCallback, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@components/segments/Header"

const USER_DETAILS = {
  name: '',
  email: '',
  password: '',
  passwordConfirmed: '',
}

const Register = () => {

  const [userDetails, setUserDetails] = useState(USER_DETAILS)

  const [error, setError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const errorCheck = useCallback(() => {
    let hasError = false;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let isEmailValid = emailRegex.test(userDetails.email)

    if (!userDetails.name) {
      setError(
        { 
          type: 'name', 
          message: 'Please enter a name or nickname'
        }
      )
      hasError = true;
    } else if (!isEmailValid) {
      setError(
        { 
          type: 'email', 
          message: 'Please enter a valid email'
        }
      )
      hasError = true;
    } else if (userDetails.password.length < 3) {
      setError(
        { 
          type: 'password', 
          message: 'Password must be at least 8 characters long'
        }
      )
      hasError = true
    } else if (userDetails.password !== userDetails.passwordConfirmed) {
      setError(
        { 
          type: 'password', 
          message: 'Passwords do not match'
        }
      )
      hasError = true;
    } 

    return hasError;

  }, [userDetails])
  
  
  const register = async (e) => {
    e.preventDefault() // Prevent browsers default behavior for button submit.
    setIsSaving(true)

    const error = errorCheck();

    if (error) { return }

    try {


      const response = await fetch('/api/account/register', {
        method: 'POST',
        body: JSON.stringify({
          name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
        }),
      });

      if (response.status === 200) {

        console.log(response)
        // router.push('/')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="w-full">
      <Header 
        title="Register" 
        subtitle="Manage your trips by registering an account with Journi" 
      />
        <form className="w-full mt-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <Input
              id='name'
              label='Name'
              type='text'
              placeholder='Your first name or nick name will do!'
              onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
              maxLength={15}
              error={error && error.type === 'name'}
              full
            />
            <Input
              id='email'
              label='Email'
              type='text'
              placeholder='Enter a valid email address'
              onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
              maxLength={320}
              error={error && error.type === 'email'}
              full
            />
            <Input
              id='password'
              label='Password'
              type='password'
              placeholder='Choose a password'
              onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
              error={error && error.type === 'password'}
            />
            <Input
              id='passwordConfirmed'
              label='Confirm Password'
              type='password'
              placeholder='Confirm your password'
              onChange={(e) => setUserDetails({...userDetails, passwordConfirmed: e.target.value})}
              error={error && error.type === 'password'}
            />
            
          </div>
        </form>
        <div>
          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
        <div className="flex justify-end">
          <button 
            type='submit'
            className="black_btn"
            onClick={(e) => register(e)}
          >
            Register
          </button>  
        </div>
        
    </section>
  )
}

export default Register
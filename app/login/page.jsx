"use client"

import Input from "@components/segments/Input"
import { useState, useCallback } from "react"
import Header from "@components/segments/Header"
import { useRouter } from "next/navigation"

const USER_DETAILS = {
  email: '',
  password: '',
}

const Register = () => {
  const [userDetails, setUserDetails] = useState(USER_DETAILS)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const router = useRouter();

  const errorCheck = useCallback(() => {
    let hasError = false;
   
     if (!userDetails.email.length) {
      setError(
        { 
          type: 'email', 
          message: 'Please enter your email'
        }
      )
      hasError = true;
    } else if (!userDetails.password.length) {
      setError(
        { 
          type: 'password', 
          message: 'Please enter your password'
        }
      )
      hasError = true
    } 

    return hasError;

  }, [userDetails])
  
  
  const signIn = async (e) => {
    e.preventDefault() // Prevent browsers default behavior for button submit.
    setSaving(true)

    const error = errorCheck();

    if (error) { 
      setSaving(false)
      return;
    }

    try {
      console.log('userDetails', userDetails)
      const response = await fetch(`/api/user/${userDetails.email}`);
      console.log('userData', response)
      const userData = await response.json();
      

      if (response.ok) {
        const userCookieData = {
          userId: userData.userId,
          email: userData.email,
        }

        localStorage.setItem('journiUser', JSON.stringify(userCookieData))
        router.push('/')
      }

    } catch (error) {
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="w-full">
      <Header 
        title="Login" 
        subtitle="Sign in to start planning!" 
      />
        <form className="w-full mt-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <Input
              id='email'
              label='Email'
              type='text'
              placeholder='Enter your email address'
              onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
              maxLength={320}
              error={error && error.type === 'email'}
              full
            />
            <Input
              id='password'
              label='Password'
              type='password'
              placeholder='Enter your password'
              onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
              error={error && error.type === 'password'}
              full
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
            onClick={(e) => signIn(e)}
          >
            {saving ? 'Loading...' : 'Sign In'}
            
          </button>  
        </div>
        
    </section>
  )
}

export default Register
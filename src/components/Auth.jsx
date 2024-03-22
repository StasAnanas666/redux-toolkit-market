import React, { useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'


const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      console.log('signed up')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      console.log('logged in')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut()
      console.log('logged out')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await firebase.auth().signInWithPopup(provider)
    }
    catch (error) {
      console.error(error)
    }
  }




  return (
    <div>
      {firebase.auth().currentUser ? (
        <div>
          <p>Hello {firebase.auth().currentUser.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignInWithGoogle}>Sign In With Google</button>
        </div>
      )}
    </div>
  )
}

export default Auth

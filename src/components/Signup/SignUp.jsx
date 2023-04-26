import { useState } from 'react'
import './Signup.scss'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {createUser} = UserAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createUser(email, password)
      navigate('/account')
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
      console.log(error.message)
    }
  }

  return (
    <div className='sign-up'>
      <h2 className='sign-up__header'>Sign Up</h2>
      <p>Already have an account? <Link to='/'>Log In</Link> </p>
      {error && <p className='sign-up__error-message'>{error}</p>}
      <form className='form' onSubmit={handleSubmit}>
        <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='User email' value={email} required/>
        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password'value={password} required/>
        <button type='submit' >{loading ? 'Signing Up...' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default SignUp
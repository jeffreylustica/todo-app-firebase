import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import { UserAuth } from '../../context/AuthContext'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { logIn } = UserAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await logIn(email, password)
      navigate('/account')
      setLoading(false)
    } catch (error) {
      setError(error.message)
      console.log(error.message)
      setLoading(false)
    }
  }

  return (
    <div className='log-in'>
        <h2 className='log-in__header'>Log In</h2>
        <p>Don't have an account yet? <Link to='/signup'>Sign Up</Link> </p>
        {error && <p className='log-in__error-message'>{error}</p>}
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='User email' value={email} required/>
          <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' value={password} required/>
          <button type='submit' >{loading ? 'Logging In...' : 'Log In'}</button>
        </form>
    </div>
  )
}

export default LogIn
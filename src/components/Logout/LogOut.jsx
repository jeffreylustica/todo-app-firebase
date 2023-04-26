import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Logout.scss'
import { UserAuth } from '../../context/AuthContext'

const LogOut = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { logOut } = UserAuth()

    const navigate = useNavigate()

    const handleLogout = async() => {
        setLoading(true)
        try {
        await logOut()
        navigate('/')
        setLoading(false)
        } catch (error) {
        setError(error.message)
        console.log(error.message)
        setLoading(false)
        }
    }
  return (
    <button type='button' onClick={handleLogout} className='account__log-out'>{loading ? 'Logging Out...' : 'Log Out'}</button>
  )
}

export default LogOut
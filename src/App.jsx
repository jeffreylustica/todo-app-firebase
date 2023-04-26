import { useState } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import LogIn from './components/Login/LogIn'
import SignUp from './components/signup/SignUp'
import Account from './components/account/Account'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1 className='app__title'>Todo App</h1>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<LogIn />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>}/>
          </Routes> 
        </AuthContextProvider>
      </div>
    </div>
  )
}

export default App

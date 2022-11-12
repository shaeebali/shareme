import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';

const App = () => {
  return (
   <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`} >   
    <Routes>
        <Route path="login" element={<Login />} /> //Login component
        <Route path="/*" element={<Home />} />     //Home component 
    </Routes>
   </GoogleOAuthProvider> 
  )
}

export default App

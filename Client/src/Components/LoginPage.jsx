import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  return (
  <div>
    <h2>Login Page</h2>
    <button onClick={() => navigate('/chat')}>Start</button>
  </div>
  )
}

export default Login
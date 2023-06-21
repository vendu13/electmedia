import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from '../pages/Admin pages/Login/Login';

function Protected({ isLoggedIn, children }) {
    const navigate=useNavigate()
    if (!isLoggedIn) {
        // toast.error("Please Login to continue!")
        return <Navigate to="/api/v1/admin/login" replace />;

        // return <Login/>
        }
  return (
    children
  )
}

export default Protected
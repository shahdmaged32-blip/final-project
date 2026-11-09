
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ adminOnly = false }) {

  const token = localStorage.getItem('token')
  const loginType = localStorage.getItem('loginType')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && loginType !== 'dummyjson') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

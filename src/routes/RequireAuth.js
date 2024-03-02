import React from 'react'
import { Navigate } from 'react-router-dom'
const RequireAuth = ({ children,authToken }) => {
  const token = authToken
  return token ? <>{children}</> : <Navigate to="/login" replace />
}
export default RequireAuth
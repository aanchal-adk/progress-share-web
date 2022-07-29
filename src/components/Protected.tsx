import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
  children: React.ReactElement
}

function Protected({children}: ProtectedProps) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />
  }

  return children;
}

export default Protected;

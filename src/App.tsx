import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import './App.css';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === '/' && <Navigate to={isLoggedIn ? '/home': '/login'} />}
      <Outlet />
    </div>
  );
}

export default App;

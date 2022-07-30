import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import './css/App.css';
import Header from './components/Header';

function App() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const location = useLocation();

  
  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate(isLoggedIn ? '/home': '/login');
    }
  }, [location.pathname, isLoggedIn, navigate]);

  return (
    <div className="App">
      {isLoggedIn && <>
        <Header/>
      </>}

      <Outlet />
    </div>
  );
}

export default App;

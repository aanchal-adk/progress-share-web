import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import './css/App.css';
import Header from './components/Header';
import { getUserInfo } from './api/user.api';
import { UserInfo } from './interfaces/user.interface';

function App() {
  const [userInfo, setuserInfo] = React.useState<UserInfo| null>(null);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const location = useLocation();

  React.useEffect(() => {
    fetchUserInfo();
  }, []);

  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate(isLoggedIn ? '/home': '/login');
    }

    if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/home');
    }

  }, [location.pathname, isLoggedIn, navigate]);


  const fetchUserInfo = async () => {
    const result = await getUserInfo();
    
    setuserInfo(result.data);
  }

  return (
    <div className="App">
      {isLoggedIn && <>
        <Header pathname={location.pathname} userInfo={userInfo} />
      </>}

      <Outlet />
    </div>
  );
}

export default App;

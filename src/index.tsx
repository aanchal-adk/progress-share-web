import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Protected from './components/Protected';
import history from './helpers/history.helper';
import reportWebVitals from './reportWebVitals';
import MyTrackers from './components/MyTrackers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="home" element={
            <Protected>
              <Home />
            </Protected>
          } />
          <Route path="my-trackers" element={
            <Protected>
              <MyTrackers />
            </Protected>
          } />
          <Route path="profile" element={
            <Protected>
              <Profile />
            </Protected>
          } />
        </Route>
      </Routes>
    </HistoryRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

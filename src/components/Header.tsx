import React from 'react';

import '../css/Header.css';
import {ReactComponent as Logo} from '../assets/logo-small.svg';
import {ReactComponent as Avatar} from '../assets/avatar.svg';
import {ReactComponent as Star} from '../assets/star.svg';
import {ReactComponent as Plus} from '../assets/plus.svg';

function Header () {
  return <div className="app-header">
    <Logo />

    <ul className="center-menu">
      <li className="selected">Home</li>
      <li>My Trackers</li>
    </ul>

    <div className="right-menu">
      <button className="new-tracker-btn">New Tracker <Plus className="plus-icon" /></button>
      
      <div className="points-wrapper">
        28 <Star/>
      </div>

      <div className="profile-wrapper">
        <Avatar/>
      </div>
    </div>

  </div>
}

export default Header;

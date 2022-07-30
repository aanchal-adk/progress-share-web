import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import '../css/Header.css';
import {ReactComponent as Logo} from '../assets/logo-small.svg';
import {ReactComponent as Avatar} from '../assets/avatar.svg';
import {ReactComponent as Star} from '../assets/star.svg';
import {ReactComponent as Plus} from '../assets/plus.svg';

const menuList = [
  {
    name: 'Home',
    pathname: '/home'
  },
  {
    name: 'My Trackers',
    pathname: '/my-trackers'
  }
];

function Header (props: {pathname:string;}) {
  const CenterMenuList = () => {
    const List = menuList.map(item => {
      const style = classnames({
        'selected': item.pathname === props.pathname
      });

      return <li className={style}><Link to={item.pathname}>{item.name}</Link></li>
    });

    return <ul className="center-menu">
      {List}
    </ul>
  }

  return <div className="app-header">
    <Logo />

    
    <CenterMenuList/>

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

import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import '../css/App.css';
import '../css/Header.css';

import ProfileIcon from './ProfileIcon';
import AddTrackerModal from './AddTrackerModal';

import { UserInfo } from '../interfaces/user.interface';

import {ReactComponent as Star} from '../assets/star.svg';
import {ReactComponent as Plus} from '../assets/plus.svg';
import {ReactComponent as Logo} from '../assets/logo-small.svg';

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

interface ComponentProps {
  pathname: string;
  userInfo: UserInfo | null;
}

function Header (props: ComponentProps) {
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);

  const username = props.userInfo?.username || '';
  const points = props.userInfo?.points || 0;

  const CenterMenuList = () => {
    const List = menuList.map(item => {
      const style = classnames({
        'selected': item.pathname === props.pathname
      });

      return <li key={item.name} className={style}><Link to={item.pathname}>{item.name}</Link></li>
    });

    return <ul className="center-menu">
      {List}
    </ul>
  }

  return <div className="app-header">
    <Logo />

    
    <CenterMenuList/>

    <div className="right-menu">
      <button className="new-tracker-btn" onClick={() => setModalIsOpen(true)}>New Tracker <Plus className="plus-icon" /></button>
      
      <div className="points-wrapper">
        {points} <Star/>
      </div>

      <ProfileIcon username={username} />
    </div>

    <AddTrackerModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
  </div>
}

export default Header;

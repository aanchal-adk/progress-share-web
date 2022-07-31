import '../css/Header.css'
import {ReactComponent as Avatar} from '../assets/avatar.svg';
import { getPastelColor } from 'pastel-color';

function ProfileIcon (props:{username: string}) {
  console.log('USERNAME: ', props.username);

  return props.username? <div className="profile-wrapper" style={{background: getPastelColor(props.username).hex}}>
    <Avatar/>
  </div>: <></>
}

export default ProfileIcon;

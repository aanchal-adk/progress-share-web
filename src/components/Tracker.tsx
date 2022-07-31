import React from 'react';

import ProfileIcon from './ProfileIcon';
import { addCheckin } from '../api/tracker.api';
import { UserInfo } from '../interfaces/user.interface';
import {ReactComponent as Checkin} from '../assets/checkin.svg';
import {ReactComponent as Checked} from '../assets/checked.svg';

import { TrackerWCheckinInterface } from '../interfaces/trackers.interface';

interface ComponentProps {
  userInfo: UserInfo;
  trackerInfo: TrackerWCheckinInterface;
  getMyTrackers: () => void;
}

function Tracker (props: ComponentProps) {
  const trackerStreaks = [];
  const total_days = props.trackerInfo.total_days;
  const streakWidth = total_days === 7? '152px': total_days === 14? '75px': '40px';
  const diff_days = Math.floor((Date.now() - Date.parse(props.trackerInfo.created_at))/(1000*3600*24));

  const handleCheckinClick = async (dayNumber: number) => {
    try {
      await addCheckin({
        trackerId: props.trackerInfo.id,
        dayNumber: dayNumber,
        isRepaired: false
      });

      alert('Successfully checked in for today!');

      props.getMyTrackers();

    } catch (err) {
      alert('Error checking in. Please try again later.')
    }
  }

  for(let i=1; i <= props.trackerInfo.total_days; i++) {
    const isCheckedIn = !!props.trackerInfo.checkins.find(item => item.day_num === i);
    const bgColor = isCheckedIn ? '#75BA31': '#D9D9D9';

    trackerStreaks.push(<div className="streak" style={{width: streakWidth, background: bgColor}}>
      {diff_days === i && <>
        {!isCheckedIn? <Checkin className="checkin" onClick={() => {handleCheckinClick(i)}} />: <Checked className="checked" /> }
      </>}
    </div>);
  }

  return <div className="tracker">
    <div className="tracker-top">
      <ProfileIcon username={props.userInfo.username} />
      <h4>{props.trackerInfo.title}</h4>

      {/* To Do: Reactions */}
 
    </div>

    <div className="streak-wrapper">
      {trackerStreaks}
    </div>
    <div className="tracker-bottom">

    </div>
  </div>
}

export default Tracker;

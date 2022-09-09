import React from 'react';

import ProfileIcon from './ProfileIcon';
import { addCheckin } from '../api/tracker.api';
import { UserInfo } from '../interfaces/user.interface';
import {ReactComponent as Checkin} from '../assets/checkin.svg';
import {ReactComponent as Checked} from '../assets/checked.svg';

import { TrackerWCheckinInterface } from '../interfaces/trackers.interface';
import classNames from 'classnames';

interface ComponentProps {
  userInfo: UserInfo;
  trackerInfo: TrackerWCheckinInterface;
  getMyTrackers: () => void;
}

function Tracker (props: ComponentProps) {
  const trackerStreaks = [];
  const total_days = props.trackerInfo.total_days;
  const streakWidth = total_days === 7? '152px': total_days === 14? '75px': '40px';
  
  const currentDate = new Date();
  const UTCDay = currentDate.getUTCDate();
  const UTCMonth = currentDate.getUTCMonth() + 1;
  const UTCYear = currentDate.getUTCFullYear();

  const date1 = new Date(`${UTCYear}/${UTCMonth}/${UTCDay}`).valueOf();
  const date2 = new Date(props.trackerInfo.created_at.split('T')[0].replace('-', '/')).valueOf();
  const diff_days = Math.floor((date1 - date2)/(1000*3600*24));


  const handleCheckinClick = async (dayNumber: number) => {
    try {
      await addCheckin({
        trackerId: props.trackerInfo.id,
        dayNumber: dayNumber,
        isRepaired: false
      });

      if (props.trackerInfo.total_days === dayNumber) {
        alert('Congratulations! You have successfully achieved your goal!');
      } else {
        alert('Successfully checked in for today!');
      }


      props.getMyTrackers();

    } catch (err) {
      alert('Error checking in. Please try again later.')
    }
  }

  for(let i=1; i <= props.trackerInfo.total_days; i++) {
    const isCheckedIn = !!props.trackerInfo.checkins.find(item => item.day_num === i);
    const bgColor = isCheckedIn ? '#75BA31': '#D9D9D9';

    trackerStreaks.push(<div className="streak" style={{width: streakWidth, background: bgColor}}>
      {(props.trackerInfo.userid === props.userInfo.userid) && diff_days === (i -1) && <>
        {!isCheckedIn? <Checkin className="checkin" onClick={() => {handleCheckinClick(i)}} />: <Checked className="checked" /> }
      </>}
    </div>);
  }

  const trackerStyle = classNames({
    'tracker': true,
    'self-tracker': props.userInfo.userid === props.trackerInfo.userid
  })

  return <div className={trackerStyle}>
    <div className="tracker-top">
      <ProfileIcon username={props.trackerInfo.username} />
      <h4>{props.trackerInfo.title}</h4>

      {/* To Do: Reactions */}
 
    </div>

    <div className="streak-wrapper">
      {trackerStreaks}
    </div>
    <div className="tracker-bottom">
    {/* To Do: Show days remaining and total reactions received */}
    </div>
  </div>
}

export default Tracker;

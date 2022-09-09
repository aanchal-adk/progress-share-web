import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import '../css/App.css';
import '../css/Home.css';
import '../css/MyTracker.css';

import Tracker from './Tracker';
import * as constants from '../constants';
import { UserInfo } from '../interfaces/user.interface';
import { fetchMyTrackersWithCheckin } from '../api/tracker.api';
import { TrackerWCheckinInterface } from '../interfaces/trackers.interface';

interface menuInterface {
  name: string;
  id: number;
}

const subMenuList: menuInterface[] = [
  {
    name: 'In Progress',
    id: constants.TRACKER_IN_PROGRESS
  },
  {
    name: 'Completed',
    id: constants.TRACKER_COMPLETE
  }
]

function MyTrackers () {
  const {userInfo} = useOutletContext<{userInfo: UserInfo}>();

  const [selectedTab, setSelectedTab] = React.useState<menuInterface>(subMenuList[0]);
  const [myTrackerList, setMyTrackerList] = React.useState<TrackerWCheckinInterface[]>([]);


  useEffect(() => {
    getMyTrackers();
    
  }, []);

  const getMyTrackers = async () => {
    try {
      const result = await fetchMyTrackersWithCheckin(null);
      
      setMyTrackerList(result.data);

    } catch (err) {
      console.log("ERR: ", err);
    }
  }
  return <div className="app-content-wrapper">
    <div className="home-wrapper">
      
      <div className="sub-menu">  
        {subMenuList.map(item =>{
          const subMenuStyle = classNames({
            'sub-menu-item': true,
            'selected': selectedTab.id === item.id
          }); 

          return <div className={subMenuStyle} onClick={() => {setSelectedTab(item)}}>{item.name}</div>
        })}
      </div>

      <div className="tracker-list">
      {myTrackerList.filter(item => item.status_id === selectedTab.id).map(pTracker => <Tracker userInfo={userInfo} trackerInfo={pTracker} getMyTrackers={getMyTrackers} />)}

      </div>
    </div>
  </div>
}

export default MyTrackers;

import classnames from 'classnames';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import '../css/App.css';
import '../css/Home.css';
import Tracker from './Tracker';
import { UserInfo } from '../interfaces/user.interface';
import { fetchMyTrackersWithCheckin } from '../api/tracker.api';
import { TrackerWCheckinInterface } from '../interfaces/trackers.interface';


function Home () {

  const {userInfo} = useOutletContext<{userInfo: UserInfo}>();
  const [myTrackerList, setMyTrackerList] = React.useState<TrackerWCheckinInterface[]>([]);
  const [selectedTracker, setSelectedTracker] = React.useState<TrackerWCheckinInterface>();

  useEffect(() => {
    getMyTrackers();
  }, []);

  const getMyTrackers = async () => {
    try {
      const result = await fetchMyTrackersWithCheckin();
      
      setMyTrackerList(result.data);

      if (result.data.length > 0) {
        if (!selectedTracker) {
          setSelectedTracker(result.data[0]);
        } else {
          const updatedSelectedTracker = result.data.find(item => item.id === selectedTracker.id);
          setSelectedTracker(updatedSelectedTracker);
        }
      }

    } catch (err) {
      console.log("ERR: ", err);
    }
  }

  return <div className="app-content-wrapper">
    <ul className="my-tracker-pills">
      {
        myTrackerList.map(item => {
          const style = classnames({
            'unselected': item.id !== selectedTracker?.id
          });

          return <li 
          className={style}
          key={item.id}
          onClick={() => setSelectedTracker(item)}
          data-hover={item.title}>
              
              {item.title}
              </li>
        })
      }
    </ul>
    
    <div className="tracker-list">
      {selectedTracker && <Tracker userInfo={userInfo} trackerInfo={selectedTracker} getMyTrackers={getMyTrackers} />}
    </div>
   
  </div>
}

export default Home;

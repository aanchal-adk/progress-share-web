import classnames from 'classnames';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import '../css/App.css';
import '../css/Home.css';
import Tracker from './Tracker';
import * as constants from '../constants';
import { UserInfo } from '../interfaces/user.interface';
import { TrackerWCheckinInterface } from '../interfaces/trackers.interface';
import { fetchMyTrackersWithCheckin, fetchPublicTrackersWithCheckin } from '../api/tracker.api';


function Home () {

  const {userInfo} = useOutletContext<{userInfo: UserInfo}>();
  const [myTrackerList, setMyTrackerList] = React.useState<TrackerWCheckinInterface[]>([]);
  const [publicTrackerList, setPublicTrackerList] = React.useState<TrackerWCheckinInterface[]>([]);
  const [selectedTracker, setSelectedTracker] = React.useState<TrackerWCheckinInterface>();

  useEffect(() => {
    getMyTrackers();
    getPublicTrackers();
  }, []);

  const getMyTrackers = async () => {
    try {
      const result = await fetchMyTrackersWithCheckin(constants.TRACKER_IN_PROGRESS);
      
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

  const getPublicTrackers = async () => {
    try {
      const result = await fetchPublicTrackersWithCheckin();
      
      setPublicTrackerList(result.data);

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
      {publicTrackerList.filter(item => item.tracker_type_id === selectedTracker?.tracker_type_id).map(pTracker => <Tracker userInfo={userInfo} trackerInfo={pTracker} getMyTrackers={getMyTrackers} />)}
    </div>

    {!selectedTracker && <div className="empty-home">
      Looks like you're new here. Please create a new progress tracker from the 'New Tracker +' button in the top right.
      </div>}
   
  </div>
}

export default Home;

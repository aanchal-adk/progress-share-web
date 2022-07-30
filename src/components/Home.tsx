import React, { useEffect } from 'react';

import '../css/App.css';
import '../css/Home.css';
import { fetchMyTrackers } from '../api/tracker.api';
import { TrackerInterface } from '../interfaces/trackers.interface'; 

function Home () {
  const [myTrackerList, setMyTrackerList] = React.useState<TrackerInterface[]>([]);

  useEffect(() => {
    getMyTrackers();
  }, []);

  const getMyTrackers = async () => {
    try {
      const result = await fetchMyTrackers();
      
      setMyTrackerList(result.data as TrackerInterface[]);

    } catch (err) {
      console.log("ERR: ", err);
    }
  }

  return <div className="app-content-wrapper">
    <ul className="my-tracker-pills">
      {
        myTrackerList.map(item => {
          return <li key={item.id} data-hover={item.title}>{item.title}</li>
        })
      }
    </ul>
  </div>
}

export default Home;

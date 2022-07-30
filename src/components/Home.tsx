import classnames from 'classnames';
import React, { useEffect } from 'react';

import '../css/App.css';
import '../css/Home.css';
import { fetchMyTrackers } from '../api/tracker.api';
import { TrackerInterface } from '../interfaces/trackers.interface';

function Home () {
  const [myTrackerList, setMyTrackerList] = React.useState<TrackerInterface[]>([]);
  const [selectedTracker, setSelectedTracker] = React.useState<TrackerInterface | null>(null);

  useEffect(() => {
    getMyTrackers();
  }, []);

  const getMyTrackers = async () => {
    try {
      const result = await fetchMyTrackers();
      
      setMyTrackerList(result.data);

      if (result.data.length > 0) {
        setSelectedTracker(result.data[0]);
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
  </div>
}

export default Home;

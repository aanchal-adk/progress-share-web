import React, { useEffect } from 'react';

import '../css/App.css';
import { fetchMyTrackers } from '../api/tracker.api';

function MyTrackers () {
  useEffect(() => {
    getMyTrackers();
  }, []);

  const getMyTrackers = async () => {
    try {
      const result = await fetchMyTrackers();
      console.log("DATA: ", result);

    } catch (err) {
      console.log("ERR: ", err);
    }
  }

  return <div className="home-wrapper">
    Tracker page
  </div>
}

export default MyTrackers;

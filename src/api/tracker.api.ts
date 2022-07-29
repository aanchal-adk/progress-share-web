import http from '../http';

export function fetchMyTrackers () {
  const accessToken = localStorage.getItem('accessToken');

  return http.get('/my-trackers', {
    headers: {
     'Authorization':  `Bearer ${accessToken}`
    }
  });
}

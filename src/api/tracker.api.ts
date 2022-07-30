import { AxiosResponse } from 'axios';

import http from '../http';
import { TrackerInterface } from '../interfaces/trackers.interface';

export function fetchMyTrackers (): Promise<AxiosResponse<TrackerInterface[]>> {
  const accessToken = localStorage.getItem('accessToken');

  return http.get<TrackerInterface[]>('/my-trackers', {
    headers: {
     'Authorization':  `Bearer ${accessToken}`
    }
  });
}

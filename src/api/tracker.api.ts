import { AxiosResponse } from 'axios';

import http from '../http';
import { TrackerInterface, NewTrackerInterface } from '../interfaces/trackers.interface';

export function fetchMyTrackers (): Promise<AxiosResponse<TrackerInterface[]>> {

  return http.get<TrackerInterface[]>('/my-trackers');
}

export function createNewTracker (data: NewTrackerInterface): Promise<AxiosResponse<number>> {
  return http.post<number>('/new-tracker', data);
}

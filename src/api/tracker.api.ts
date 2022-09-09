import { AxiosResponse } from 'axios';

import http from '../http';
import { TrackerInterface, NewTrackerInterface, TrackerWCheckinInterface, AddCheckinInterface } from '../interfaces/trackers.interface';

export function fetchMyTrackers (): Promise<AxiosResponse<TrackerInterface[]>> {

  return http.get<TrackerInterface[]>('/my-trackers');
}

export function fetchMyTrackersWithCheckin (statusId: number | null): Promise<AxiosResponse<TrackerWCheckinInterface[]>> {

  return http.get<TrackerWCheckinInterface[]>(statusId ? `/my-tracker-w-checkin?status_id=${statusId}`: '/my-tracker-w-checkin');
}

export function fetchPublicTrackersWithCheckin (): Promise<AxiosResponse<TrackerWCheckinInterface[]>> {

  return http.get<TrackerWCheckinInterface[]>('/public-tracker-w-checkin');
}

export function createNewTracker (data: NewTrackerInterface): Promise<AxiosResponse<number>> {
  return http.post<number>('/new-tracker', data);
}

export function addCheckin (data: AddCheckinInterface): Promise<AxiosResponse<number>> {
  return http.post<number>('/add-checkin', data);
}

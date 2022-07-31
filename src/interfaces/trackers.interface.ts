export interface TrackerInterface {
  id: number;
  userid: number;
  title: string;
  tracker_type_id: number;
  total_days: number;
  status_id: number;
  created_at: string;
  updated_at: string;
};

export interface NewTrackerInterface {
  title: string;
  tracker_type_id: number;
  total_days: number;
  status_id: number;
}

export interface TrackerWCheckinInterface {
  id: number;
  userid: number;
  title: string;
  tracker_type_id: number;
  total_days: number;
  status_id: number;
  created_at: string;
  checkins: Checkin[];
};

interface Checkin {
  day_num: number;
  is_checked_in: boolean;
  is_repaired: boolean;
}

export interface AddCheckinInterface {
  trackerId: number;
  dayNumber: number;
  isRepaired: boolean;
}

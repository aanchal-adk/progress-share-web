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

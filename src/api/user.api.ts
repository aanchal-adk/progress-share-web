import { AxiosResponse } from 'axios';

import { UserInfo } from '../interfaces/user.interface';

import http from '../http';

export function getUserInfo ():Promise<AxiosResponse<UserInfo>> {
  return http.get<UserInfo>('/user-info');
}

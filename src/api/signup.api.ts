import http from '../http';
import { SignupData, LoginRequestData } from '../interfaces/signup.interface';

export function signup (data: SignupData) {
  
  return http.post('/signup', data);
}

export function login (data: LoginRequestData) {
  
  return http.post('/login', data);
}

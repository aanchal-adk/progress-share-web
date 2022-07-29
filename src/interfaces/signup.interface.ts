export interface SignupData {
  first_name: string;  
  last_name: string;  
  username: string;  
  email: string;
  password: string;    
};

export interface LoginRequestData {
  email: string;
  password: string;    
};

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;  
};

export interface RefreshTokenResp {
  accessToken: string;
}

export function logout () {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
}

export const getJwt = () => {
  return localStorage.getItem('user-token')
};
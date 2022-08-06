import http from '../../http-common';

const register = async (data) => {
  return await http.post('api/auth/signup', data);
};

const login = async (data) => {
  return await http.post('api/auth/signin', data);
};

const authService = { register, login };

export default authService;
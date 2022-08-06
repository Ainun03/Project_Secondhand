// import axios from 'axios';
import http from '../../http-common';

// get user by email
const getUsers = async ({ token }) => {
  return await http.get(`users/get-all-user`);
};

// TODO user other services

const userService = { getUsers };

export default userService;
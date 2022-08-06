import axios from 'axios';

export default axios.create({
  baseURL: 'https://binar-secondhand-production.herokuapp.com/',
});
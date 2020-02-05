import axios from 'axios';

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: 'https://foodiefun-buildweek.herokuapp.com',
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
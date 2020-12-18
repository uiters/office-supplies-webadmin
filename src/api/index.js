import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'https://offie-supplies-and-bookstore.herokuapp.com/api/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})

export const injectTokenAndSession = (request) => {
  const token = localStorage.getItem('token')
  if (token) { request.headers.Authorization = `${token}` }
  // return request
}

HTTP.interceptors.request.use(
  value => {
 injectTokenAndSession(value)
    return value
},
  error => {
    return Promise.reject(error)
  },
)

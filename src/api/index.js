import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'https://offie-supplies-and-bookstore.herokuapp.com/api/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})

// export const injectTokenAndSession = function (value) {
//   const dataManager = DI.get(DataManager);
//   const session = dataManager.getSession();
//   const token = dataManager.getToken();
//   if (token) {
//     request.headers["Token-Id"] = token;
//   }
//   if (session && StringUtils.isNotEmpty(session)) {
//     request.headers["Authorization"] = `Bearer ${session}`;
//   }
//   return request;
// }
//
// HTTP.interceptors.request.use(
//   value => this.injectTokenAndSession(value),
//   error => {
//     return Promise.reject(error);
//   }
// );

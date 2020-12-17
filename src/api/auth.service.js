import { HTTP } from './index'

export default class AuthService {
  static api = 'auth'

  static login (payload) {
    return HTTP.post(`${this.api}/login`, {
      username: payload.username,
      password: payload.password,
    })
  }
}

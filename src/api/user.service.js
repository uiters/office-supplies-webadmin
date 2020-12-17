import { HTTP } from './index'

export default class AuthService {
  static api = 'user'

  static getAllUsers () {
    return HTTP.get(`${this.api}/?page=1`)
  }

  static getMe () {
    return HTTP.get(`${this.api}/me`)
  }
}

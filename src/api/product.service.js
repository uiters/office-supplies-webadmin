import { HTTP } from './index'

export default class ProductService {
  static api = 'product'
  static getProduct () {
    return HTTP.get(`${this.api}/product-admin`)
  }

  static onCensored (id, status) {
    console.log(id, status)
    return HTTP.put(`${this.api}`, { id, status })
  }
}

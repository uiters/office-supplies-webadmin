import { HTTP } from './index'

export default class ProductService {
  static api = 'product'

  static getProduct () {
    return HTTP.get(`${this.api}/?page=1&keyword=a&sortBy=price`)
  }
}

import { HTTP } from './index'

export default class ProductService {
  static api = 'product'
  static getProduct (page) {
    return HTTP.get(`${this.api}/product-admin/?page=${page}&sortBy=price`)
  }

  static onCensored (id, status) {
    return HTTP.put(`${this.api}`, { id, status })
  }

  static statisticProducts () {
    return HTTP.get('statistic/statistic-products')
  }

  static statisticInvoices () {
    return HTTP.get('statistic/statistic-invoices')
  }
}

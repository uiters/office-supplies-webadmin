import productService from './../../api/product.service'

export default {
  state: {
    products: {},
  },
  actions: {
    async getProducts () {
      const response = await productService.getProduct()
      console.log(response)
    },
    // check product
  },
  mutations: {},
}

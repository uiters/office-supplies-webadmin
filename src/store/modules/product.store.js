import productService from './../../api/product.service'

export default {
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = [...payload.products]
      // console.log(products.products)
    },
  },

  actions: {
    async getProducts (context) {
      const response = await productService.getProduct()
      context.commit({
        type: 'SET_PRODUCTS',
        products: response.data.result,
      })
    },
    // check product
  },
}

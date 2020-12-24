import productService from './../../api/product.service'

export default {
  state: {
    _totalProducts: 0,
    _pagination: {
      page: 0,
      itemsPerPage: 0,
    },
    _products: [],
    _money: 0,
  },

  getters: {
    products: state => state._products.map(value => {
      return {
        id: value.id,
        userId: value.userId.email,
        productName: value.productName,
        typeId: value.typeId.typeName,
        productImage: value.productImage,
        productDetails: value.productDetails,
        status: value.status,
        quantity: value.quantity,
        price: value.price,
      }
    }),
    totalProducts: state => state._totalProducts,
    money: state => state._money.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  },
  mutations: {
    SET_PRODUCTS (state, products) {
      state._products = [...products.result]
    },
    SET_MONEY (state, products) {
      products = { ...products, totalPriceFinishInvoices: products.totalPriceFinishInvoices }
      state._money = products.totalPriceFinishInvoices
    },
    SET_TOTAL_PRODUCTS (state, product) {
      state._totalProducts = product
    },
  },

  actions: {
    async getProducts ({ commit }, payload) {
      try {
        const { page } = payload
        const response = await productService.getProduct(page)
        commit(
          'SET_PRODUCTS',
          response.data,
        )
      } catch (e) {
        console.log('cannot get products', e)
      }
    },
    async onCensored ({ commit }, payload) {
      try {
        await productService.onCensored(payload.id, payload.status === 1 ? 0 : 1)
      } catch (e) {
        console.log('cannot change status', e)
      }
    },
    async statisticProducts ({ commit }) {
      try {
        const response = await productService.statisticProducts()
        commit(
          'SET_TOTAL_PRODUCTS',
          response.data,
        )
      } catch (e) {
        console.log('cannot get total product', e)
      }
    },
    async statisticInvoices ({ commit }) {
      try {
        const response = await productService.statisticInvoices()
        commit(
          'SET_MONEY',
          response.data,
        )
      } catch (e) {
        console.log('cannot get statistic invoices', e)
      }
    },
  }
  ,
}

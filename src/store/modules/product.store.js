import productService from './../../api/product.service'

export default {
  state: {
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
        status: value.status,
        quantity: value.quantity,
        price: value.price,
      }
    }),
    money: state => state._money.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  },
  mutations: {
    SET_PRODUCTS (state, products) {
      state._products = [...products]
    },
    SET_MONEY (state) {
      state._products.map(value => {
      console.log(value)
        state._money = value.quantity * value.price
      })
    },
  },

  actions: {
    async getProducts ({ commit }) {
      try {
        const response = await productService.getProduct()
        commit(
          'SET_PRODUCTS',
          response.data.result,
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
  }
  ,
}

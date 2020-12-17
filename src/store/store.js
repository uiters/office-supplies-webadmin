import Vue from 'vue'
import Vuex from 'vuex'

import initState from './modules/initstate.store'
import user from './modules/user.store'
import product from './modules/product.store'
import auth from './modules/auth.store'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    initState,
    user,
    product,
    auth,
  },
  strict: debug,
})

import authService from './../../api/auth.service'

export default {
  namespaced: true,
  actions: {
    async login (type, payload) {
      const response = await authService.login(payload)
      if (response.data) {
        localStorage.setItem('token', response.data)
      }
      return !!response.data
    },
    async logout () {
      localStorage.removeItem('token')
    },
  },
}

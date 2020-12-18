import authService from './../../api/auth.service'

export default {
  namespaced: true,
  actions: {
    async login (type, payload) {
      try {
        const response = await authService.login(payload)
        if (response.data) {
          localStorage.setItem('token', response.data)
        }
        return !!response.data
      } catch (e) {
        alert('Your email or password incorrect')
      }
    },
    async logout () {
      localStorage.removeItem('token')
    },
  },
}

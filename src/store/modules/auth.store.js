import authService from './../../api/auth.service'

export default {
  namespaced: true,
  state: {
    username: '',
    password: '',
  },
  actions: {
    login (payload) {
      payload = {
        username: 'admin@gmail.com',
        password: '123456789',
      }
      authService.login(payload).then(value => console.log(value))
    },
  },
}

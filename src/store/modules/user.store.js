import userService from './../../api/user.service'

export default {
  state: {},
  actions: {
    async getUsers () {
      const response = await userService.getAllUsers()
      console.log(response)
    },
    async getMe () {
      const response = await userService.getMe()
      console.log(response)
    },
  },
  mutations: {},
}

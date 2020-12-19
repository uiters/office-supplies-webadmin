import userService from './../../api/user.service'

export default {
  state: {
    _users: [],
  },
  getters: {
    users: state => state._users.map(value => {
      return {
        id: value.id,
        name: value.profile.fullName,
        phoneNumber: value.profile.phoneNumber,
        email: value.email,
        status: value.status,
      }
    }),
  },
  mutations: {
    SET_USERS (state, users) {
      console.log(users)
      state._users = [...users]
    },
  },
  actions: {
    async getUsers ({ commit }) {
      try {
        const response = await userService.getAllUsers()
        commit(
          'SET_USERS',
          response.data.user,
        )
      } catch (e) {
        console.log('cannot get users', e)
      }
    },
    async getMe () {
      const response = await userService.getMe()
      console.log(response)
    },
  },
}

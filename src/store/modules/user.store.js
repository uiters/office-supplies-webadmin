import userService from './../../api/user.service'

export default {
  state: {
    _users: [],
    _user: {},
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
    user: state => state._user,
  },
  mutations: {
    SET_USERS (state, users) {
      console.log(users)
      state._users = [...users]
    },
    SET_USER (state, user) {
      state._user = user
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
    async getMe ({ commit }) {
      try {
      const response = await userService.getMe()
        commit(
          'SET_USER',
          response.data,
        )
      console.log(response)
      } catch (e) {
        console.log('cannot get me', e)
      }
    },
  },
}

import axios from 'axios'

const state = {
  users: []
}

const getters = {
  users: state => {
    return state.users
  }
}

const mutations = {
  FETCH_USERS (state, users) {
    state.users = users
  },
  SORT_USERS (state, payload) {
    if (payload === 'id') {
      state.users.sort((a, b) => a.id - b.id)
    } else if (payload === 'order') {
      state.users.sort((a, b) => a.order - b.order)
    } else {
      state.users.sort((a, b) => 0.5 - Math.random())
    }
  },
  UPDATE_USERS (state, users) {
    state.users = users
  }
}

const actions = {
  fetchUsers (context) {
    return new Promise((resolve, reject) => {
      axios.get('https://jsonplaceholder.typicode.com/todos/').then(function (response) {
        response.data.forEach(function (value, key) {
          value.order = key
        })
        context.commit('FETCH_USERS', response.data)
        resolve()
      })
    })
  },
  sortUsers (context, payload) {
    context.commit('SORT_USERS', payload)
  },
  updateList (context, payload) {
    payload.forEach(function (value, key) {
      value.order = key
    })
    context.commit('UPDATE_USERS', payload)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

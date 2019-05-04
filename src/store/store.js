import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: []
  },
  getters: {
    getUsers: state => {
      return state.users
    }
  },
  mutations: {
    FETCH_USERS(state, users) {
      state.users = users
    },
    SORT_USERS(state, payload) {
      if (payload === 'id') {
        state.users.sort((a, b) => a.id - b.id)
      } else if (payload === 'order') {
        state.users.sort((a, b) => a.order - b.order)
      } else {
        state.users.sort((a, b) => 0.5 - Math.random())
      }
    }
  },
  actions: {
    fetchUsers(context)  {  
      return new Promise((resolve, reject) =>  {     
        axios.get('https://jsonplaceholder.typicode.com/todos/').then(function (response) {
          response.data.forEach(function (value, key) {
            value.order = key;
          });
          context.commit("FETCH_USERS", response.data)
          resolve()
        })
      });
    },
    sortUsers(context, payload) {
      context.commit("SORT_USERS", payload)
    }
  }
})

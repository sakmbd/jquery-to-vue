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
    }
  },
  actions: {
    fetchUsers({ commit })  {  
      return new Promise((resolve, reject) =>  {     
        axios.get('https://jsonplaceholder.typicode.com/todos/').then(function (response) {
          console.log('Vuex', response.data);
          commit("FETCH_USERS", response.data)
          resolve()
        })
      });
    }
  }
})

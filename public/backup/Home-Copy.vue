<template>
  <div class="home">
    <h1>To Do List Example</h1>
    <p>Rewrite the following legacy jQuery application in Vue using a Vuex state management (<a
        href="https://vuex.vuejs.org/" target="_new">https://vuex.vuejs.org/</a>)</p>
    <p>Features:</p>
    <ul>
      <li>Render List of TODOs retrieved from REST API</li>
      <li>Sort list of TODOs</li>
      <li>Order list of TODOs by dragging vertically - drag event updates the order property of all items in the list
      </li>
      <li>Click TODO to see TODO details</li>
    </ul>
    <p id="loading-error" class="error">Error: Unable to load TODO list!</p>

    <p class="sort-btns">
      Sort by:
      <button id="sort-by-id" @click="sortBy('id')" :class="{selected:active == 'id'}">ID</button>
      <button id="sort-by-order" @click="sortBy('order')" :class="{selected:active == 'order'}">Order</button>
      <button id="sort-by-random" @click="sortBy('shuffle')" :class="{selected:active == 'shuffle'}">Random</button>
    </p>

    <!-- TODO List to Populate -->
    <ul id="todo-list" class="ui-sortable">
      <li v-for="user in users" :key="user.id" class="ui-state-default" @click="showUserInfo(user.id)">
        <i class="fas" :class="{ 'fa-times': user.completed==false, 'fa-check': user.completed==true }"></i> {{ user.title }}
      </li>
    </ul>

    <!-- user info components -->
    <user-info :user="singleUser"></user-info>
    <br>
    <h2>Hello</h2>
    <ul id="todo-list" class="ui-sortable">
      <draggable
          :list="users"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false">
        <li v-for="user in users" :key="user.id" class="ui-state-default" @click="showUserInfo(user.id)">
          <i class="fas" :class="{ 'fa-times': user.completed==false, 'fa-check': user.completed==true }"></i> {{ user.title }}
        </li>
      </draggable>
    </ul>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserInfo from '@/components/UserInfo.vue'
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      active: 'id',
      singleUser: [],
      enabled: true,
    }
  },
  components: {
    UserInfo,
    draggable
  },
  computed: {
    ...mapGetters([
      'users',
    ])
  },
  created () {
    this.$store.dispatch('fetchUsers').then(() => {
      console.log('Dispatch the state action method')
    })
  },
  methods: {
    sortBy (sorter) {
      this.active = sorter
      this.$store.dispatch('sortUsers', sorter)
    },
    showUserInfo(id) {
      this.singleUser = this.users.filter(obj => obj.id === id);
    }
  }
}
</script>

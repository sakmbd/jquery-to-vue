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
      <button id="sort-by-id" @click="sortBy('id')" class="selected">ID</button>
      <button id="sort-by-order" @click="sortBy('order')">Order</button>
      <button id="sort-by-random" @click="sortBy('shuffle')">Random</button>
    </p>

    <!-- TODO List to Populate -->
    <ul id="todo-list">
      <li v-for="user in users" :key="user.id">
        <i class="fas" :class="{ 'fa-times': user.completed==false, 'fa-check': user.completed==true }"></i> {{ user.title }}
      </li>
    </ul>

    <div id="todo-details">Click a TODO to render details</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    }
  },
  created() {
    this.$store.dispatch("fetchUsers").then(() => {
      this.users = this.$store.getters.getUsers
    });
    console.log(this.users);
  },
  methods: {
    sortBy(sorter) {
      if(sorter == 'id') {
        this.users.sort((a, b) => a.id > b.id);
      }
    }
  }
}
</script>

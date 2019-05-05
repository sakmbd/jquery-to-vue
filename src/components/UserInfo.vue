<template>
  <div id="todo-details">
    <span v-if="!user.length">Click a TODO to render details</span>
    <div v-else>
      <h3>TODO</h3>
      <p>Id: {{ user[0].id }}</p>
      <p>title: {{ user[0].title }}</p>
      <p>order: {{ user[0].order }}</p>
      <p v-if="user[0].completed">complete? <i class="fas" :class="{ 'fa-check': user[0].completed==true }"></i> yes</p>
      <p v-else>complete? <i class="fas" :class="{ 'fa-times': user[0].completed==false }"></i> no</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>

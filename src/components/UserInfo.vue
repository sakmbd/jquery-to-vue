<template>
  <div>
  	<div id="todo-details" v-if="user !== 'undefined'">Click a TODO to render details</div>
  	<div v-else>{{ user.id }}</div>
  </div>
</template>

<script>
export default {
  props: ['singleUser'],
  data () {
    return {
      user: this.singleUser
    }
  },
  mounted() {
  	console.log(this.singleUser)
  }
}
</script>

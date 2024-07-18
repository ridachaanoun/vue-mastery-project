<template>
  <div class="home">
    <TodoList />
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  name: 'HomeView',
  components: {
    // HelloWorld,
    TodoList,
  },
};
</script>

<style scoped>
/* Scoped styles */
</style>

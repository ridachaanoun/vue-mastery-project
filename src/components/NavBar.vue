<template>
    <nav class="bg-gray-800 p-4 text-white">
      <div class="container mx-auto flex justify-between">
        <router-link to="/" class="font-bold text-xl">Home</router-link>
        <div>
          <router-link to="/posts" class="mr-4">Posts</router-link>
          <router-link to="/users" class="mr-4">Users</router-link>
          <router-link v-if="!isAuthenticated" to="/login" class="mr-4">Login</router-link>
          <router-link v-if="!isAuthenticated" to="/register" class="mr-4">Register</router-link>
          <button v-if="isAuthenticated" @click="logout" class="bg-red-500 p-2 rounded">Logout</button>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    data() {
      return {
        isAuthenticated: !!localStorage.getItem('userId'),
      };
    },
    methods: {
      logout() {
        localStorage.removeItem('userId');
        this.isAuthenticated = false;
        this.$router.push('/login');
      },
    },
    watch: {
      $route() {
        this.isAuthenticated = !!localStorage.getItem('userId');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles */
  </style>
  
<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Users</h1>
      <ul class="space-y-4">
        <li v-for="user in users" :key="user.id" class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-xl font-semibold">{{ user.name }}</h2>
          <p class="text-gray-700">{{ user.email }}</p>
          <p class="text-gray-500">{{ user.phone }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import apiClient from '../api';
  
  export default {
    name: 'UserList',
    data() {
      return {
        users: [],
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await apiClient.get('/users');
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles if needed */
  </style>
  
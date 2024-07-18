<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 mb-2 w-full" required />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 mb-2 w-full" required />
      <button type="submit" class="bg-blue-500 text-white p-2 w-full">Login</button>
    </form>
  </div>
</template>

<script>
import apiClient from '../api';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
  async login() {
    try {
      const response = await apiClient.get('/users', {
        params: {
          email: this.email,
          password: this.password,
        },
      });

      const user = response.data.find(
        (user) => user.email === this.email && user.password === this.password
      );

      if (user) {
        // Store userId instead of authToken
        localStorage.setItem('userId', user.id);
        this.$router.push('/');
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid login credentials');
    }
  },
},
};
</script>

<style scoped>
/* Scoped styles */
</style>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" class="border p-2 mb-2 w-full rounded-lg focus:outline-none focus:border-blue-500" required />
      <input v-model="username" type="text" placeholder="Username" class="border p-2 mb-2 w-full rounded-lg focus:outline-none focus:border-blue-500" required />
      <input v-model="email" type="email" placeholder="Email" class="border p-2 mb-2 w-full rounded-lg focus:outline-none focus:border-blue-500" required />
      <input v-model="city" type="text" placeholder="City" class="border p-2 mb-2 w-full rounded-lg focus:outline-none focus:border-blue-500" required />
      <input v-model="phone" type="text" placeholder="Phone" class="border p-2 mb-2 w-full rounded-lg focus:outline-none focus:border-blue-500" required />
      <input v-model="website" type="text" placeholder="Website" class="border p-2 mb-2 w-full rounded-lg focus:outline-none focus:border-blue-500" required />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 mb-2 w-full rounded-lg focus:outline-none focus:border-blue-500" required />
      <button type="submit" class="bg-blue-500 text-white p-2 w-full rounded-lg shadow-md hover:bg-blue-600 transition duration-300">Register</button>
    </form>
  </div>
</template>

<script>
import apiClient from '../api';

export default {
  name: 'UserRegister',
  data() {
    return {
      name: '',
      username: '',
      email: '',
      city: '',
      phone: '',
      website: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        await apiClient.post('/users', {
          name: this.name,
          username: this.username,
          email: this.email,
          address: {
            city: this.city,
          },
          phone: this.phone,
          website: this.website,
          password: this.password,  // Assuming you are storing the password
        });
        alert('Registration successful! Please log in.');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error registering:', error);
        alert('Registration failed');
      }
    },
  },
};
</script>

<style scoped>
/* Scoped styles */
</style>

<template>
  <div class="container mx-auto p-4 ">
    <h1 class="text-2xl font-bold mb-4">Posts</h1>
    <ul class="space-y-4">
      <li v-for="post in posts" :key="post.id" class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        <p class="text-gray-700 mt-2">{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import apiClient from '../api';

export default {
  name: 'PostList',
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await apiClient.get('/posts');
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Scoped styles if needed */
</style>

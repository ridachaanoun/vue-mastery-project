<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">{{ post.title }}</h1>
      <p class="text-gray-700 mb-4">{{ post.body }}</p>
      <CommentList v-if="post.id" :postId="post.id.toString()" />
    </div>
  </template>
  
  <script>
  import apiClient from '../api';
  import CommentList from './CommentList.vue';
  
  export default {
    name: 'SinglePost',
    components: {
      CommentList,
    },
    data() {
      return {
        post: {},
      };
    },
    created() {
      this.fetchPost();
    },
    methods: {
      async fetchPost() {
        try {
          const response = await apiClient.get(`/posts/${this.$route.params.id}`);
          this.post = response.data;
          console.log("Post ID:", this.post.id); // Ensure post.id is correct
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles */
  </style>
  
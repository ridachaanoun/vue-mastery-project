<template>
    <div>
      <h1>Posts</h1>
      <ul>
        <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import apiClient from '../api';
  
  export default {
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
          console.log(this.posts)
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    background: #f4f4f4;
    margin: 10px 0;
    padding: 10px;
    border-radius: 4px;
  }
  </style>
  
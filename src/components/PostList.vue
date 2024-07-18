<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Posts</h1>
    <form @submit.prevent="addPost" class="mb-4">
      <input v-model="newPost.title" placeholder="Title" class="border p-2 mr-2" required />
      <textarea v-model="newPost.body" placeholder="Body" class="border p-2 mr-2" required></textarea>
      <button type="submit" class="bg-blue-500 text-white p-2">Add Post</button>
    </form>
    <ul class="space-y-4">
      <li v-for="post in posts" :key="post.id" class="bg-white p-4 rounded-lg shadow">
        <router-link :to="{ name: 'SinglePost', params: { id: post.id } }" class="text-xl font-semibold">{{ post.title }}</router-link>
        <p class="text-gray-700 mt-2">{{ post.body }}</p>
        <button v-if="post.userId === userId" @click="openEditModal(post)" class="bg-yellow-500 text-white p-2 mr-2">Edit</button>
        <button v-if="post.userId === userId" @click="deletePost(post.id)" class="bg-red-500 text-white p-2">Delete</button>
      </li>
    </ul>
    <EditPostModal :show="showEditModal" :post="selectedPost" @close="closeEditModal" @save="updatePost" />
  </div>
</template>

<script>
import EditPostModal from './EditPostModal.vue';
import apiClient from '../api';

export default {
  name: 'PostList',
  components: {
    EditPostModal
  },
  data() {
    return {
      posts: [],
      newPost: {
        title: '',
        body: '',
        comments: [],
      },
      userId: localStorage.getItem('userId'),
      showEditModal: false,
      selectedPost: null,
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
    async addPost() {
      try {
        if (!this.userId) {
          confirm("You are not logged in");
          return;
        }
        const response = await apiClient.post('/posts', { ...this.newPost, userId: this.userId });
        this.posts.unshift(response.data);
        this.newPost.title = '';
        this.newPost.body = '';
      } catch (error) {
        console.error('Error adding post:', error);
      }
    },
    async deletePost(postId) {
      const confirmed = confirm('Are you sure you want to delete this post?');
      if (confirmed) {
        await apiClient.delete(`/posts/${postId}`);
        this.posts = this.posts.filter(post => post.id !== postId);
      }
    },
    openEditModal(post) {
      this.selectedPost = { ...post };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    async updatePost(updatedPost) {
      try {
        await apiClient.put(`/posts/${updatedPost.id}`, updatedPost);
        const index = this.posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          this.posts.splice(index, 1, updatedPost);
        }
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  },
};
</script>

<style scoped>
/* Scoped styles */
</style>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Posts</h1>
    <form @submit.prevent="addPost" class="mb-6">
      <div class="flex mb-4">
        <input v-model="newPost.title" placeholder="Title" class=" rounded-lg flex-1 mr-2 px-4 py-2 ring-2   " required />
        <textarea v-model="newPost.body" placeholder="Body" class=" rounded-lg flex-1 px-4 py-2 ring-2" required></textarea>
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Add Post</button>
    </form>
    <ul class="space-y-6">
      <li v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500">Posted by: {{ getUsername(post.userId) }}</p>
          <div>
            <button v-if="post.userId === userId" @click="openEditModal(post)" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2">Edit</button>
            <button v-if="post.userId === userId" @click="deletePost(post.id)" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
          </div>
        </div>
        <router-link :to="{ name: 'SinglePost', params: { id: post.id } }" class="block text-2xl font-semibold hover:text-blue-500">{{ post.title }}</router-link>
        <p class="text-gray-700 mt-2">{{ post.body }}</p>
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
      users: [], // To store users data
    };
  },
  created() {
    this.fetchPosts();
    this.fetchUsers(); // Fetch users data
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
    async fetchUsers() {
      try {
        const response = await apiClient.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    getUsername(userId) {
      const user = this.users.find(user => user.id === userId);
      return user ? user.username : 'Unknown'; // Return username or 'Unknown' if not found
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
/* Scoped styles can be empty or removed */
</style>

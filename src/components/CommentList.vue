<template>
  <div class="mt-4">
    <h3 class="text-lg font-bold">Comments</h3>
    <form @submit.prevent="addComment" class="mb-4">
      <input v-model="newComment" placeholder="Add a comment" class="border p-2 w-full" required />
      <button type="submit" class="bg-blue-500 text-white p-2 mt-2">Add Comment</button>
    </form>
    <ul class="space-y-2">
      <li v-for="comment in comments" :key="comment.id" class="bg-gray-100 p-2 rounded">
        <p class="font-semibold">{{ comment.body }}</p>
        <button v-if="comment.userId === userId" @click="editComment(comment)" class="bg-yellow-500 text-white p-2 mr-2">Edit</button>
        <button v-if="comment.userId === userId" @click="deleteComment(comment.id)" class="bg-red-500 text-white p-2">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import apiClient from '../api';

export default {
  name: 'CommentList',
  props: {
    postId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      newComment: '',
      userId: localStorage.getItem('userId'),
    };
  },
  watch: {
    postId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fetchComments(newVal);
        }
      }
    }
  },
  methods: {
    async fetchComments(postId) {
      try {
        const response = await apiClient.get(`/posts/${postId}`);
        this.comments = response.data.comments;
        console.log("Comments fetched for post ID:", postId);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async addComment() {
      try {
        if (!this.userId) {
          confirm("You are not logged in");
          return;
        }
        const newComment = {
          id: Date.now(),
          body: this.newComment,
          userId: this.userId,
        };
        this.comments.push(newComment);

        // Update the post with new comment
        await apiClient.patch(`/posts/${this.postId}`, {
          comments: this.comments
        });

        this.newComment = '';
        console.log("New comment added:", newComment);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
    async deleteComment(commentId) {
      const confirmed = confirm('Are you sure you want to delete this comment?');
      if (confirmed) {
        try {
          // Fetch the post first
          const postResponse = await apiClient.get(`/posts/${this.postId}`);
          const post = postResponse.data;

          // Filter out the comment to be deleted
          const updatedComments = post.comments.filter(comment => comment.id !== commentId);

          // Update the post with the new comments array
          await apiClient.patch(`/posts/${this.postId}`, { comments: updatedComments });

          // Update the local comments state
          this.comments = updatedComments;
          console.log(`Comment with ID ${commentId} deleted.`);
        } catch (error) {
          console.error('Error deleting comment:', error);
        }
      }
    },
    async editComment(comment) {
      const updatedBody = prompt("Update comment", comment.body);
      if (updatedBody) {
        try {
          const postResponse = await apiClient.get(`/posts/${this.postId}`);
          const post = postResponse.data;
          console.log(post.comments)
          const updatedComments = post.comments.map(c => 
            c.id === comment.id ? { ...c, body: updatedBody } : c
          );
          console.log(updatedComments)
          // Update the post with the new comments array
          await apiClient.patch(`/posts/${this.postId}`, { comments: updatedComments });

          // Update the local comment state
          comment.body = updatedBody;
          console.log(`Comment with ID ${comment.id} updated.`);
        } catch (error) {
          console.error('Error updating comment:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Scoped styles */
</style>

<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-semibold mb-2">Edit Post</h2>
      <input v-model="editedPost.title" placeholder="Title" class="border p-2 mb-2 w-full" required />
      <textarea v-model="editedPost.body" placeholder="Body" class="border p-2 mb-2 w-full h-60" required></textarea>
      <div class="flex justify-end">
        <button @click="savePost" class="bg-blue-500 text-white p-2 mr-2">Save</button>
        <button @click="closeModal" class="bg-red-500 text-white p-2">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPostModal',
  props: {
    show: Boolean,
    post: Object,
  },
  data() {
    return {
      editedPost: { ...this.post },
    };
  },
  watch: {
    post(newPost) {
      this.editedPost = { ...newPost };
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    savePost() {
      this.$emit('save', this.editedPost);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Modal styles */
</style>

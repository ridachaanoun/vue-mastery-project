<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Todos Management</h2>
      <form @submit.prevent="addTodo" class="mb-4">
        <input v-model="newTodoTitle" placeholder="New Todo" class="border p-2 mr-2 w-full" required />
        <button type="submit" class="bg-blue-500 text-white p-2 mt-2">Add Todo</button>
      </form>
      <ul class="space-y-2">
        <li v-for="todo in todos" :key="todo.id" class="bg-gray-100 p-2 rounded flex justify-between items-center">
          <span :class="{ 'line-through': todo.completed }">{{ todo.title }}</span>
          <div>
            <button @click="editTodo(todo)" class="bg-yellow-500 text-white p-2 mr-2">Edit</button>
            <button @click="deleteTodo(todo.id)" class="bg-red-500 text-white p-2">Delete</button>
            <button @click="toggleComplete(todo)" class="bg-green-500 text-white p-2">{{ todo.completed ? 'incomplete' : 'Complete' }}</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import apiClient from '../api';
  
  export default {
    name: 'TodoList',
    data() {
      return {
        todos: [],
        newTodoTitle: '',
        userId: localStorage.getItem('userId'), // Assuming userId is stored in localStorage
      };
    },
    created() {
      this.fetchTodos();
    },
    methods: {
      async fetchTodos() {
        try {
          const response = await apiClient.get('/todos');
          this.todos = response.data.filter(todo => String(todo.userId) === String(this.userId));
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      },
      async addTodo() {
        try {
            if (!this.userId) {
          confirm("You are not logged in");
          return;
        }
          const newTodo = {
            title: this.newTodoTitle,
            completed: false,
            userId: this.userId,
            id: String(Date.now()) , // Generate a unique integer ID
          };
          await apiClient.post('/todos', newTodo);
          this.todos.push(newTodo);
          this.newTodoTitle = '';
        } catch (error) {
          console.error('Error adding todo:', error);
        }
      },
      async deleteTodo(todoId) {
        try {
          await apiClient.delete(`/todos/${todoId}`);
          this.todos = this.todos.filter(todo => todo.id !== todoId);
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      },
      async editTodo(todo) {
        const updatedTitle = prompt('Update todo title', todo.title);
        if (updatedTitle) {
          try {
            await apiClient.put(`/todos/${todo.id}`, { ...todo, title: updatedTitle });
            todo.title = updatedTitle;
          } catch (error) {
            console.error('Error updating todo:', error);
          }
        }
      },
      async toggleComplete(todo) {
        try {
          await apiClient.put(`/todos/${todo.id}`, { ...todo, completed: !todo.completed });
          todo.completed = !todo.completed;
        } catch (error) {
          console.error('Error toggling todo completion:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .line-through {
    text-decoration: line-through;
  }
  </style>
  
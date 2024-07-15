import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import PostList from '../components/PostList.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: PostList, 
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

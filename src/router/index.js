import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue';
import Posts from '../components/Posts-.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

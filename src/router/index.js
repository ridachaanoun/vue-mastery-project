import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Posts from '../components/PostList.vue';
import Users from '../components/UserList.vue';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import SinglePost from '../components/SinglePost.vue';
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
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegister,
  },
  {
    path: '/posts/:id',
    name: 'SinglePost',
    component: SinglePost,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

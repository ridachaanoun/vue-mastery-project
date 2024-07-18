<template>
  <div id="app flex flex-col min-h-screen">
    <NavBar />
    <router-view />
    <footer v-if="showFooter">
      <AppFooter />
    </footer>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    AppFooter,
  },
  data() {
    return {
      showFooter: true, // Initially show the footer
    };
  },
  watch: {
    // Watch for route changes
    $route(to) {
      // Check if the current route is login or register
      if (to.path === '/login' || to.path === '/register') {
        this.showFooter = false; // Hide the footer on login/register pages
      } else {
        this.showFooter = true; // Show the footer on other pages
      }
    },
  },
};
</script>

<style>
/* Global styles can go here */
body {
  font-family: Arial, sans-serif;
}
</style>

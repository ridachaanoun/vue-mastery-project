<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/posts">Posts</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  padding: 15px;
}
nav a {
  margin-right: 10px;
}
</style>

<script setup>
</script>

<template>
  <div>
    <header>
      <h1>Vue Blog</h1>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/posts">Manage Posts</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view /> 
    </main>
  </div>
</template>

<style scoped>
header {
  background-color: #42b983;
  padding: 1rem;
  color: white;
  text-align: center;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
}

nav li {
  margin: 0 1rem;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 1rem;
}
</style>

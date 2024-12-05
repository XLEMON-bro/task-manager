<template>
  <div id="app">
    <Header/>
    <h1>Task Manager</h1>
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent.vue"

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

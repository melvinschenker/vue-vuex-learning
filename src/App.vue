<template>
  <Search />
  <Connections />
</template>

<script>
import Search from './components/Search.vue'
import Connections from './components/Connections.vue'

export default {
  name: 'App',
  components: {
    Search,
    Connections
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

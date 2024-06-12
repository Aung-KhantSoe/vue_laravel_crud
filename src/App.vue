<template>
  <Header title="CRUD"></Header>
  <router-view/>
</template>
<script>

import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header,
    
  }
}
</script>
<style>

</style>

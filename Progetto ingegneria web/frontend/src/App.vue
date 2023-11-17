<template>
<html lang="it">
<div id="app">
  <div>
    <router-view></router-view>
    <NavBar />
  </div>
  <div class="container-fluid p-0 overflow-hidden">
      <router-view></router-view>
  </div>
    <!--<script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
<a href="#">
<lord-icon
    id="freccia"
    src="https://cdn.lordicon.com/xdakhdsq.json"
    trigger="hover"
    colors="primary:#61B5D9"
    style="width:50px;height:50px">
</lord-icon></a>-->

  

 <!-- <script src="https://unpkg.com/vue@3"></script>
  <script src="https://unpkg.com/vue-router@4"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="./index.js"></script>-->
 </div>

</html>

</template>

<script lang="ts">
import NavBar from './components/NavBar.vue'

export default {
    name: 'App',
    components: {
        NavBar
        //FooterComponent
    }
  }

</script>

<style lang="scss">
@import "./styles/style.scss";
</style>
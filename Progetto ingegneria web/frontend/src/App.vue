<template>
<html lang="it">
<body>
<div class="container-fluid p-0 overflow-hidden" id="app">
  <div class="row" id="navbar">
    <div class="col-12">
      <nav class="navbar navbar-expand-md navbar-dark px-3">
        <div>
          <a href="./index.html" class="p-0"><img src="./img/angular-icon-1.svg" alt="AngularJS Logo" width="30" height="30" class="ms-1"><a class="navbar-brand p-0" href="#">ngular</a></a>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto nav-pills">
            <li class="nav-item">
              <router-link to="/home"><a class="nav-link px-3 px-lg-auto" type="button">Home</a></router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tutorial"><a class="nav-link px-3 px-lg-auto" type="button">Tutorial</a></router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link to="/accessibility"><a class="nav-link px-3 px-lg-auto" type="button">Accessibility</a></router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link to="/login"><a class="nav-link px-3 px-lg-auto" type="button">Login</a></router-link>
            </li>
          </ul>
            <div class="col-5 col-md-6 col-lg-7"></div>
            <div id="darkmode" class="col-1 float-right">
              <button type="button" class="btn btn-primary" id="theme-switch">
              <img src="./img/brightness.png" alt="Bottone Darkmode/Lightmode">
             </button>
            </div>
        </div>
      </nav>
      
    </div>
  </div>

<main>
  <router-view></router-view>
</main>
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

  
<div class="container-fluid d-flex align-items-center" id="footer">
  <div class="me-4 text-start col-8" id="nomi">
    <p class="pt-2 ps-2">Tommaso Foca</p>
    <p class="py-3 ps-2">Alexandru Apostol</p>
  </div>
</div>
 <!-- <script src="https://unpkg.com/vue@3"></script>
  <script src="https://unpkg.com/vue-router@4"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="./index.js"></script>-->
</body>

</html>

</template>

<style lang="scss">
@import "./styles/style.scss";
</style>
<template>
<div class="row" id="navbar">
    <div class="col-12">
      <nav class="navbar navbar-expand-md navbar-dark px-3">
        <div>
          <a href="#" class="p-0"><img src="../img/angular-icon-1.svg" alt="AngularJS Logo" width="30" height="30" class="ms-1"><a class="navbar-brand p-0" href="#">ngular</a></a>
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
              <router-link to="/forum"><a class="nav-link px-3 px-lg-auto" type="button">Forum</a></router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link to="/popular"><a class="nav-link px-3 px-lg-auto" type="button">Popular</a></router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link to="/login"><a class="nav-link px-3 px-lg-auto" type="button">Login</a></router-link>
            </li>
          </ul>
            <div class="col-5 col-md-6 col-lg-7"></div>
            <div id="darkmode" class="col-1 float-right">
              <button type="button" class="btn btn-primary" id="theme-switch">
              <img src="../img/brightness.png" alt="Bottone Darkmode/Lightmode">
             </button>
            </div>
        </div>
      </nav>
      
    </div>
  </div>
</template>
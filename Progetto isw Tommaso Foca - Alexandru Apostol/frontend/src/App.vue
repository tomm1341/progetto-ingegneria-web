<template>
  <html lang="it">
  <div class="container-fluid overflow-hidden p-0">
    <div>
      <div class="row" id="navbar">
        <div class="col-12 p-0">
          <nav class="navbar navbar-expand-md navbar-dark px-3">
            <div>
              <router-link to="/" class="p-0">
                <img src="../public/img/angular-icon-1.svg" alt="AngularJS Logo" width="30" height="30" class="ms-1" />
                <a class="navbar-brand p-0" href="#">ngular</a>
              </router-link>
            </div>
            <button class="navbar-toggler me-4" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto nav-pills">
                <li class="nav-item">
                  <router-link to="/">
                    <a class="nav-link px-3 px-lg-auto" type="button">Home</a>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/forum">
                    <a class="nav-link px-3 px-lg-auto" type="button">
                      Forum
                    </a>
                  </router-link>
                </li>
                <li class="nav-item dropdown">
                  <router-link to="/popular">
                    <a class="nav-link px-3 px-lg-auto" type="button">
                      Popular
                    </a>
                  </router-link>
                </li>
                <li class="nav-item dropdown">
                  <router-link to="/login">
                    <a class="nav-link px-3 px-lg-auto" type="button">
                      Login
                    </a>
                  </router-link>
                </li>
              </ul>
              <div class="col-5 col-md-6 col-lg-7"></div>
              <div class="col-1 float-right grow flex justify-end items-center gap-3">
                <!--<UserInfo v-if="user" :user="user" />-->
                <span v-if="user" class="text-sm">{{ user.username }}</span>
                <button v-if="user" class="btn !px-2" @click="logout">
                  Logout
                </button>
                <template v-else>
                  <RouterLink to="/login" class="btn">Login</RouterLink>
                  <RouterLink to="/register" class="btn !bg-blue-500 text-white">Registrati</RouterLink>
                </template>
              </div>
              <div id="darkmode" class="col-1">
                <button type="button" class="btn btn-primary" id="theme-switch">
                  <img src="../public/img/brightness.png" alt="Bottone Darkmode/Lightmode" />
                </button>
              </div>
            </div>
          </nav>
          <div class="float-end">
            <!--<div class="d-none" id="UserDiv" @login-success="updateLoggedInUser">
              <div v-if="loggedInUser">
                <p>Benvenuto, {{ loggedInUser }}</p>
              </div>
            </div>-->
          </div>
        </div>
      </div>
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

    <div class="container-fluid d-flex align-items-center ps-3" id="footer">
      <div class="me-4 text-start col-8" id="nomi">
        <p class="pt-2 ps-2">Tommaso Foca</p>
        <p class="py-3 ps-2">Alexandru Apostol</p>
      </div>
    </div>
  </div>

  </html>
</template>

<script lang="ts">
document.addEventListener('DOMContentLoaded', function () {
  // Get the button
  let button = document.getElementById('theme-switch')
  // Get the body element
  let body = document.body
  // Set the initial theme
  let theme = 'light'

  // Set the initial theme class on the body element
  body.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme')

  // Toggle the theme when the button is clicked
  if (button != null)
    button.addEventListener('click', function () {
      theme = theme === 'light' ? 'dark' : 'light'

      // Remove the previous theme class from the body element
      body.classList.remove(theme === 'dark' ? 'light-theme' : 'dark-theme')

      // Add the new theme class to the body element
      body.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme')
    })
})
import axios from "axios"
import { PropType, defineComponent } from "vue"
import UserInfo from "./components/user-info.vue"
import { Utente } from "./types"

export default defineComponent({
  components: { UserInfo },
  data() {
    return {
      user: null as Utente | null,
    }
  },
  props: {
    user: Object as PropType<Utente>,
  },
  methods: {
    async logout() {
      await axios.post("/api/logout")
      window.location.reload()
    },
    async getUser() {
      const res = await axios.get("/api/profile")
      this.user = res.data
    },
  },
  mounted() {
    this.getUser()
  },
})
</script>
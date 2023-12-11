import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import "./style.scss"
import App from './App.vue'
//import HelloWorld from "./components/HelloWorld.vue"
import Home from './pages/Home.vue'
import Register from './pages/Register.vue'
import Login from './pages/Login.vue'
import Forum from './pages/Forum.vue'
import Popular from './pages/Popular.vue'
import PageNotFound from './pages/NotFound.vue'


const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component:  Home},
      { path: "/register", component: Register },
      { path: "/login", component: Login},
      { path: "/forum", component: Forum },
      { path: "/popular", component: Popular },
      { path: "/:pathMatch(.*)*", component: PageNotFound }
    ]
  })

createApp(App)
  .use(router)
  .mount("#app")

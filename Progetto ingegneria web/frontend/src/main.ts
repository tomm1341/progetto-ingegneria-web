import { createApp } from "vue"
import { Router, createRouter, createWebHistory } from "vue-router"
import App from './App.vue'
//import HelloWorld from "./components/HelloWorld.vue"
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Forum from './pages/Forum.vue'
import Popular from './pages/Popular.vue'


const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component:  Home},
      { path: "/login", component: Login },
      { path: "/forum", component: Forum },
      { path: "/popular", component: Popular }
      /*{ path: "/articolo/:idArticolo", component: Articolo },
      { path: "/:pathMatch(.*)*", component: PageNotFound }*/
    ]
  })

createApp(App)
  App.use(router)
  .mount("#app")

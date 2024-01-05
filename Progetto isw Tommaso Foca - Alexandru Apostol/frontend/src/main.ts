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
import MakeQuestion from "./pages/MakeQuestion.vue"


const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component:  Home},
      { path: "/register", component: Register },
      { path: "/login", component: Login},
      { path: "/forum", component: Forum },
      { path: "/popular", component: Popular },
      { path: "/newQuestion",
        name: 'newQuestion',
        component: () => import(/* webpackChunkName: "makeQuestion" */ './pages/MakeQuestion.vue'),
        props: true, // Per passare i parametri come prop invece che nella sezione $route.params 
        },
      { path: "/:pathMatch(.*)*", component: PageNotFound }
    ]
  })

createApp(App)
  .use(router)
  .mount("#app")

import axios from 'axios'
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
import UsersList from './pages/UsersList.vue'
import Profile from './pages/Profile.vue'
import { Utente } from './types'


const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component:  Home},
      { 
        path: "/register", component: Register,
        meta: { requireLogout: true } 
      },
      { 
        path: "/login", component: Login,
        meta: {requireLogout: true }
      },
      { 
        path: "/forum", component: Forum, 
        props: true
      },
      { path: "/popular", component: Popular },
      { path: "/newQuestion",
        component: MakeQuestion,
        props: true, // Per passare i parametri come prop invece che nella sezione $route.params
        meta: { requireLogin: true}
        },
      { 
        path: "/usersList", component: UsersList,
        props: true,
        meta: { requireLogin: true, requireAdmin: true}
      },
      { 
        path: "/profile", component: Profile,
        meta: { requireLogin: true }
      },
      { path: "/:pathMatch(.*)*", component: PageNotFound }
    ]
  })

  // Funzione che viene eseguita prima di ogni navigazione del router
router.beforeEach(async (to) => {
  const res = await axios.get("/api/profile")
  const user = res.data as Utente | null
  // Se la pagina richiede il login, ma l'utente non l'ha effettuato, lo rimanda alla pagina di login
  if (to.meta.requireLogin && !user) {
    return { path: "/login", query: { message: "Devi effettuare il login per poter accedere alla pagina" } }
  }
  // Se la pagina richiede il logout, ma l'utente ha effettuato l'accesso, lo rimanda alla home
  if (to.meta.requireLogout && user) {
    return { path: "/", query: { message: "Devi prima effettuare il logout" } }
  }

  if (to.meta.requireAdmin && user?.ruolo != 'admin') {
    return { path: "/", query: { message: "Non hai i permessi per accedere a questa pagina" }}
  }
})

createApp(App)
  .use(router)
  .mount("#app")

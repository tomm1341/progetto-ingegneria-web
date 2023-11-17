import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import App from './App.vue'
//import HelloWorld from "./components/HelloWorld.vue"
import Home from './components/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component:  Home}//,
     /* { path: "/archivio", component: Archivio },
      { path: "/contatti", component: Contatti },
      { path: "/login", component: Login },
      { path: "/articolo/:idArticolo", component: Articolo },
      { path: "/:pathMatch(.*)*", component: PageNotFound }*/
    ]
  })

createApp(App)
  .use(router)
  .mount("#app")

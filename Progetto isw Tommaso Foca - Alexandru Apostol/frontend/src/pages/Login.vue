<template>
  <div class="mx-5 bg-white rounded float-center">
    <div class="container-fluid col-12 float-center" id="app1">
      <div class="row my-5"></div>
      <h1 class="text-center mt-5">Login</h1>
      <div class="container-fluid col-12">
        <div class="row my-5"></div>
        <form @submit.prevent="login" autocomplete="off" class="ps-5 pe-4">
          <div class="form-floating ms-5 col-11 col-md-10 me-0">
            <input v-model="email" type="email" id="email" name="email" class="form-control"
              placeholder="name@example.com" required>
            <label for="email" class="text-secondary">Email</label>
          </div>
          <div class="form-floating ms-5 col-11 col-md-10 me-0">
            <input v-model="password" type="password" id="password" name="password" class="form-control"
              placeholder="Password" required>
            <label for="password" class="text-secondary">Password</label>
          </div>
          <div class="col-2 ms-5">
            <input class="btn add-btn" type="submit" value="Login" id="login">
          </div>
          <div class="col-2">
            <input class="btn add-btn btn-success d-none" type="button" value="Conferma" id="confbutton">
          </div>
          <div class="float-end" id="regRedirect">
            <p>Nuovo utente? <router-link to="/register" class="text-decoration-underline">Registrati!</router-link></p>
          </div>
        </form>
        <div class="row my-5"></div>
      </div>

      <!--<div class="row mt-5 ms-3 justify-content-center" id="table">
    <table id="t1" class="table table-responsive table-striped mb-4">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Cognome</th>
        <th>Email</th>
        <th>Password</th>
      </tr>
    </thead>
    <tbody id="lista">
      <tr v-for="utente, index in utenti" :key="utente.Email">
        <td>{{ utente.Nome }}</td>
        <td>{{ utente.Cognome }}</td>
        <td>{{ utente.Email }}</td>
        <td>{{ utente.Password }}</td>
        <td>
          <button @click="editRow(index)" class="btn btn-warning btn-sm me-2 edit" id="modifica">Modifica</button>
          <button @click="deleteRow(index)" class="btn btn-danger btn-sm text-black edit" id="elimina">Elimina</button>
        </td>
      </tr>
    </tbody>
    </table>-->
      <div class="container bg-danger d-none text-center" id="eliminato">
        <p class="pt-2">Utente eliminato</p>
      </div>
      <div class="row my-5"></div>
    </div>
  </div>
</template>


<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async login() {
      try {
        await axios.post("/api/login", {
          email: this.email,
          password: this.password,
        })
        window.location.href = "/"
      } catch (e: any) {
        if (e.response) {
          alert(`${e.response.status} - ${e.response.statusText}\n${e.response.data}`)
        } else {
          alert(e.message)
        }
      }
    },
  },
})
</script>


<style lang="scss" scoped>
input#login {
  background-color: #DC3545;
}

.dark-theme {
  & div#regRedirect>p>a {
    color: #AF6C83;
  }

  & input#login {
    background-color: #AF6C83;
  }

  & div#app1 {
    color: black;
    background-color: #7C5C77;
    border-radius: 5px;
  }
}
</style>
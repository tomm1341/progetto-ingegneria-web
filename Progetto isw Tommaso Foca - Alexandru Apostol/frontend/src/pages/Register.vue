<template>
  <div class="container" id="app1">
    <div class="float-center ms-5">
      <h1 class="text-center mt-5">Registrati</h1>
      <form @submit.prevent="inviaDati" autocomplete="off" class="align-items-center text-center">
        <div class="form-floating ms-5 col-11 col-md-10 me-0">
          <input v-model="nome" type="text" id="nome" name="nome" class="form-control" placeholder="nome" required />
          <label for="nome" class="text-secondary">Nome</label>
        </div>

        <div class="form-floating ms-5 col-11 col-md-10 me-0">
          <input v-model="cognome" type="text" id="cognome" name="cognome" class="form-control" placeholder="cognome"
            required />
          <label for="cognome" class="text-secondary">Cognome</label>
        </div>
        <div class="form-floating ms-5 col-11 col-md-10 me-0">
          <input v-model="username" type="text" id="username" name="username" class="form-control" placeholder="Username"
            required />
          <label for="username" class="text-secondary">Username</label>
        </div>
        <div class="form-floating ms-5 col-11 col-md-10 me-0">
          <input v-model="email" type="email" id="email" name="email" class="form-control" placeholder="name@example.com"
            required />
          <label for="email" class="text-secondary">Email</label>
        </div>
        <div class="form-floating ms-5 col-11 col-md-10 me-0">
          <input v-model="password" type="password" id="password" name="password" class="form-control"
            placeholder="Password" required />
          <label for="password" class="text-secondary">Password</label>
        </div>
        <div class="form-floating ms-5 col-11 col-md-10 me-0">
          <input v-model="confirmPassword" type="password" id="confirmPassword" name="confirmPassword"
            class="form-control" placeholder="Conferma Password" required />
          <label for="confirmPassword" class="text-secondary">Conferma Password</label>
        </div>
        <div class="form-floating ms-5 mb-4 col-11 col-md-10 me-0">
          <select v-model="genere" id="genere" name="genere" class="form-select" required>
            <option value="" selected disabled>Seleziona un'opzione</option>
            <option value="maschio">Maschio</option>
            <option value="femmina">Femmina</option>
            <option value="altro">Altro</option>
          </select>
          <label for="genere" class="text-secondary">Genere</label>
        </div>
        <div class="form-floating ms-5 col-11 col-md-10 me-0">
          <input v-model="eta" type="number" id="età" name="età" class="form-control" placeholder="Età" v-positive-number
            required />
          <label for="età" class="text-secondary">Età</label>
        </div>
        <div class="form-floating ms-5 col-11 col-md-10 me-0">
          <input v-model="professione" type="professione" id="professione" name="professione" class="form-control"
            placeholder="Professione" />
          <label for="professione" class="text-secondary">Professione</label>
        </div>
        <div class="form-floating ms-5 mb-4 col-11 col-md-10 me-0">
          <select v-model="ruolo" id="ruolo" name="ruolo" class="form-select" required>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <label for="ruolo" class="text-secondary">Ruolo</label>
        </div>

        <div class="col-2">
          <input class="btn add-btn bg-success" type="submit" value="Iscriviti" id="login" />
        </div>
        <div class="col-2">
          <input class="btn add-btn btn-success d-none" type="button" value="Conferma" id="confbutton" />
        </div>
      </form>

      <div class="row mt-5 ms-3 justify-content-center" id="table">
        <div class="container bg-danger d-none text-center" id="eliminato">
          <p class="pt-2">Utente eliminato</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Utente } from '../types'
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      nome: "",
      cognome: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      genere: "",
      eta: "",
      professione: "",
      ruolo: ""
    }
  },
  methods: {
    async inviaDati() {
      if (this.password != this.confirmPassword) {
        alert("Le due password non coincidono.")
        return
      }
      try {
        await axios.post("/api/register", {
          nome: this.nome,
          cognome: this.cognome,
          username: this.username,
          email: this.email,
          password: this.password,
          genere: this.genere,
          eta: this.eta,
          professione: this.professione,
          ruolo: this.ruolo
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

<style scoped>
/*Per non visualizzare le freccette nell'input dell'età*/
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

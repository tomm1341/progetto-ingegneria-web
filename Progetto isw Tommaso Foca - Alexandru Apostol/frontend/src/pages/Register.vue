<template>
  <div class="container rounded" id="app1">
    <div class="float-center align-items-center text-center">
      <h1 class="text-center text-black pt-4 mt-5">Registrati</h1>
      <div v-if="errorMessage" id="errorMessage" class="my-3 rounded text-center">{{ errorMessage }}</div>
      <form @submit.prevent="inviaDati" autocomplete="off" class="ps-5 align-items-center text-center">
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

        <div class="ps-5 col-2">
          <input class="btn add-btn" type="submit" value="Iscriviti" id="login" />
        </div>
      </form>
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
      errorMessage: "",
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
        this.errorMessage = ("Le due password non coincidono.")
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
      } catch (error: any) {
        if (error.response) {
          this.errorMessage = error.response.data;
        }
      }
    },
  },
  mounted() {
    if (this.errorMessage) {
      setTimeout(() => {
        this.errorMessage = "";
      }, 3000); // dopo 3 secondi la variabile errore torna vuota e il banner scompare
    }
  },
})

</script>

<style lang="scss" scoped>
/*Per non visualizzare le freccette nell'input dell'età*/
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

div#app1 {
  background-color: white;
}

form {
  align-items: center;
  justify-content: center;
}

input#login {
  background-color: #DC3545;
}

div#errorMessage {
  color: red;
  float: center;
}

.dark-theme {
  & div#app1 {
    background-color: #7C5C77;
  }

  & input#login {
    background-color: #AF6C83;
  }
}

@media (max-width: 768px) {
  form {
    margin-right: 5%;
  }

  form div {
    margin: 5%;
  }

  input#login {
    font-size: x-small;
    margin-left: auto;
  }
}
</style>

<template>
  <div class="mx-5 bg-white rounded float-center">
    <div class="container-fluid col-12 float-center" id="app1">
      <div class="row my-5"></div>
      <h1 class="text-center mt-5">Login</h1>
      <div class="container-fluid col-12">
        <div class="row my-5"></div>
        <form @submit.prevent="login" autocomplete="off" class="ps-5 pe-4">
          <div class="form-floating ms-5 col-11 col-md-10 me-0">
            <input v-model="username" type="username" id="username" name="username" class="form-control" maxlength="12"
              required>
            <label for="username" class="text-secondary">Username</label>
          </div>
          <div class="form-floating ms-5 col-11 col-md-10 me-0">
            <input v-model="password" type="password" id="password" name="password" class="form-control"
              placeholder="Password" maxlength="15" required>
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
import Swal from 'sweetalert2'

export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async login() {
      try {
        await axios.post("/api/login", {
          username: this.username,
          password: this.password,
        })
        window.location.href = "/"
      } catch (error: any) {
        if (error.response) {
          this.errorFunction(error.response.data.toString())
        }
      }
    },
    errorFunction(error: string) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: error
      });
    },
  },
  created() {
    if (this.$route.query.message)
      this.errorFunction(this.$route.query.message as string);
  }
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
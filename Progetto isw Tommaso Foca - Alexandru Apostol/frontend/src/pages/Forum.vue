<template>
  <div>
    <div class="container-fluid">
      <div class="row text-center mt-3">
        <div class="col-12">
          <h1 class="">Forum</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8 d-grid gap-auto row-gap-4 ms-4">
          <article class="bg-secondary p-4 border border-black rounded shadow" v-for="Question in Domande">
            <h2>Domanda numero: {{ Question.id_domanda }}</h2>
            <h3>By : {{ Question.id_utente }}</h3>
            <p>{{ Question.testo_domanda }}</p>
          </article>
        </div>
        <span id="newQuestion" class="position-fixed"><router-link to="/newQuestion">Fai una domanda!</router-link></span>
        <div class="col-2"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
span#newQuestion {
  float: right;
  right: 0;
}
</style>

<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"
import { Domanda } from "../types"

export default defineComponent({
  data() {
    return {
      Domande: [] as Domanda[]
    }
  },
  methods: {
    Questions: function () {
      axios.get("/api/forum")
        .then(response => this.Domande = response.data);
    }
  },
  mounted() {
    this.Questions()
  }
})
</script>


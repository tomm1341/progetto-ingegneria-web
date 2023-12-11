<template>
    <div>
      <div class="container-fluid">
        <div class="row text-center mt-3">
          <div class="col-12">
            <h1 class="">Forum</h1>
          </div>
            <div class="row">
              <div class="col-8"></div>
              <div class="col-4 my-4">
                <button class="btn btn-primary d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#CollapseAside">
                  Toggle Menu
                </button>
                <aside class="fs-5 bg-primary opacity-75 p-4 rounded collapse d-md-block" id="CollapseAside">
                  <h3>Popular</h3>
                  <p class="fs-5 overflow-auto">prfoafpiaajfipjfpokfopajeofpjepfaeifamfp</p>
                </aside>
              </div>
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
              <div class="col-2"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"
import { Domanda } from "../types"

export default defineComponent({
  data() {
    return {
      Domande: [] as Domanda []
    }
  },
  methods: {
    Questions: function(){
       axios.get("/api/forum")
        .then(response => this.Domande = response.data);
    }
  },
  mounted(){
    this.Questions()
  }
})
</script>


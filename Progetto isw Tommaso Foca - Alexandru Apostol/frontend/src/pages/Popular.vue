<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
//import { DettagliArticolo } from "../types"

export default defineComponent({
  data() {
    return {
      //articolo: null as DettagliArticolo | null
    }
  },
  methods: {
    getArticolo() {
        axios.get("/api/articolo/" + this.$route.params.idArticolo)
       // .then(response => this.articolo = response.data[0])
    }
  },
  mounted() {
    this.getArticolo()
  }
})
</script>

<template>
  <h1>ciao</h1>
</template>

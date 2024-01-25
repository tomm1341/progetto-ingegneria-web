<script lang="ts">
import axios from "axios"
import PostItem from "../components/post-item.vue"
import AnswerItem from "../components/answer-item.vue"
import { PropType, defineComponent } from "vue"
import { Domanda, Risposta, Utente } from "../types"

export default defineComponent({
  components: { PostItem, AnswerItem },
  props: {
    utente: Object as PropType<Utente>,
  },
  data() {
    return {
      posts: [] as Domanda[],
      utente: {} as Utente,
    }
  },
  methods: {
    async getUser() {
      await axios.get("/api/profile")
        .then(response => this.utente = response.data);

    },
    async getPosts() {
      const res = await axios.get("/api/popular")
      this.posts = res.data
    },
  },
  mounted() {
    this.getPosts()
    this.getUser()
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="row text-center mt-3">
      <div class="col-12">
        <h1 class="">Post Popolari</h1>
      </div>
    </div>
    <div class="row" v-if="posts.length > 0">
      <div class="col-2"></div>
      <div class="col-8 d-grid">
        <PostItem v-for="(post, index) in posts" class="d-grid mb-4" :key="post.id_domanda" :post="post"
          :canDelete="false" :popular="true" :isFirst="index === 0" />
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

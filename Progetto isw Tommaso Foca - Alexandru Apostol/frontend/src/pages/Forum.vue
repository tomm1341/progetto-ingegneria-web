<template>
  <div>
    <div class="container-fluid">
      <div class="row text-center mt-3">
        <div class="col-12">
          <h1 class="">Forum</h1>
        </div>
      </div>
      <div class="row">
        <span id="newQuestion" class="position-fixed"><router-link to="/newQuestion">Fai una
            domanda!</router-link></span>
        <div class="col-2"></div>
        <div class="col-8 d-grid ms-4">
          <span v-if="!utente" class="p-2 text-center rounded float-center mb-4">Effettua il login per
            commentare!</span>
          <div v-if="posts.length > 0" class="flex flex-col">
            <PostItem v-for="post in posts" class="d-grid mb-4" :key="post.id_domanda" :post="post"
              :canDelete="post.id_utente == utente?.id_utente || utente?.ruolo == 'admin'" @delete="getPosts" />
            <!--<AnswerItem v-for="answer in answers" class="d-grid mb-1" :key="answer.id_risposta" :answer="answer"
              :canDelete="answer.id_utente == utente?.id_utente || utente?.ruolo == 'admin'" @delete="getAnswers" />-->
          </div>
          <div class="col-2"></div>
        </div>
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
      answers: [] as Risposta[],
      utente: {} as Utente,
    }
  },
  methods: {
    async getUser() {
      await axios.get("/api/profile")
        .then(response => this.utente = response.data);

    },
    async getPosts() {
      const res = await axios.get("/api/forum")
      this.posts = res.data
    },
  },
  mounted() {
    this.getPosts()
    this.getUser()
  }
})
</script>


<script lang="ts">
import { PropType, defineComponent, ref } from "vue"
import { Domanda, Risposta, Utente } from "../types"
import AnswerItem from "./answer-item.vue"
import axios from "axios"

export default defineComponent({
    components: { AnswerItem },

    data() {
        return {
            id_domanda: null,
            answers: [] as Risposta[],
            utente: {} as Utente,
            commenting: "",
            newComment: "",
        }
    },
    props: {
        post: Object,   //Senza PropType perché per visualizzare lo username ho fatto un join nel metodo e col PropType dava errore
        canDelete: Boolean,
    },
    emits: ["delete"],
    methods: {
        async getUser() {
            await axios.get("/api/profile")
                .then(response => this.utente = response.data);
        },
        async deletePost() {
            await axios.delete(`/api/forum/${this.post?.id_domanda}`)
            this.$emit("delete")
        },
        async getAnswers() {
            this.id_domanda = this.post?.id_domanda
            const res = await axios.get(`/api/answers/${this.id_domanda}`)
            this.answers = res.data || []
        },

        async sendComment() {
            console.log(this.newComment)
            console.log(this.post?.id_domanda)
            await axios.post("/api/forum/newComment", {
                testo_risposta: this.newComment,
                id_domanda: this.post?.id_domanda,
            })
            this.refreshPage()
        },

        handleClickOutside(event: any) {
            const textArea = this.$refs.myTextarea as any
            if (this.commenting == 'true' && !textArea.contains(event.target)) {
                this.switchCommenting();
                setTimeout(() => document.removeEventListener('click', this.handleClickOutside), 100)
            }
        },

        postAComment() {
            this.switchCommenting()
            setTimeout(() => document.addEventListener('click', this.handleClickOutside), 100)
        },

        switchCommenting() {
            this.commenting = this.commenting === 'true' ? 'false' : 'true';
        },

        refreshPage() {
            location.reload()
        },

    },
    mounted() {
        this.getUser()
        this.getAnswers()
        this.commenting = "false"
    }
})
</script>

<template>
    <div class="px-4 rounded border border-slate-200" ref="myTextarea">
        <p class="p-3 border-bottom">
            Domanda {{ post?.id_domanda }} Di {{ post?.username }} • {{ new
                Date(post?.data
                    ??
                    "").toLocaleDateString() }}
        </p>
        <p class="fs-4 p-3 border_bottom">
            {{ post?.testo_domanda }}
        </p>
        <div v-if="canDelete" class="not-prose flex justify-end gap-2 mb-5">
            <button class="btn bg-danger float-end" @click="deletePost">Elimina post</button>
        </div>
        <div v-if="answers">
            <AnswerItem v-for="answer in answers" class="d-grid mb-4" :key="answer.id_domanda" :answer="answer"
                :canDelete="answer.id_utente == utente?.id_utente || utente?.ruolo == 'admin'" @delete="refreshPage()" />
            <button ref="postAComment" v-if="commenting != 'true' && utente" @click="postAComment()"
                class="btn bg-success text-white mb-2">Posta un
                commento!</button>
            <div v-else-if="commenting == 'true'">
                <p>Posta un commmento</p>
                <textarea v-model="newComment"></textarea>
                <button @click="sendComment()" class="btn bg-success text-white mb-2">Invia</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
textarea {
    width: 100%;
    height: 8rem;
}
</style>
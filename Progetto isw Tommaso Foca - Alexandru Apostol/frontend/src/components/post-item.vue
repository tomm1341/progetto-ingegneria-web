<script lang="ts">
import { PropType, defineComponent, ref } from "vue"
import { Domanda, Risposta, Utente } from "../types"
import AnswerItem from "./answer-item.vue"
import axios from "axios"
import Swal from "sweetalert2"

export default defineComponent({
    components: { AnswerItem },

    data() {
        return {
            id_domanda: null,
            answers: [] as Risposta[],
            utente: {} as Utente,
            popular: this.popular,
            commenting: "",
            newComment: "",
        }
    },
    props: {
        post: Object,   //Senza PropType perché per visualizzare lo username ho fatto un join nel metodo e col PropType dava errore
        canDelete: Boolean,
        popular: Boolean,
        isFirst: Boolean,
    },

    methods: {
        async getUser() {
            await axios.get("/api/profile")
                .then(response => this.utente = response.data);
        },
        async deletePost() {
            await axios.delete(`/api/forum/${this.post?.id_domanda}`)
            this.successFunction("Eliminazione avvenuta con successo")
            setTimeout(() => window.location.reload(), 1500)

        },
        async getAnswers() {
            this.id_domanda = this.post?.id_domanda
            const res = await axios.get(`/api/answers/${this.id_domanda}`)
            this.answers = res.data || []

        },
        checkInput(): boolean {
            if (this.newComment.trim() === ' ' || this.newComment.trim() === '') {
                this.errorFunction("Il campo deve contenere del testo")
                this.switchCommenting()
                return false
            } else return true
        },
        async sendComment() {
            if (this.checkInput()) {
                await axios.post("/api/forum/newComment", {
                    testo_risposta: this.newComment,
                    id_domanda: this.post?.id_domanda,
                })
                this.refreshPage()
            }
        },

        cancelCommentOp() {
            this.commenting = 'false'
            this.errorFunction("Operazione annullata")
        },

        handleClickOutside(event: any) {
            const textArea = this.$refs.myTextarea as any
            if (this.commenting == 'true' && !textArea.contains(event.target)) {
                this.switchCommenting();
                setTimeout(() => document.removeEventListener('click', this.handleClickOutside), 100)
            }
        },
        errorFunction(error: string) {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
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
        successFunction(message: string) {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: message
            });
        },

        showAlert() {
            Swal.fire({
                title: 'Attenzione!',
                text: 'Sei sicuro di voler eliminare questo account?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'Annulla'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deletePost()
                } else {
                    this.errorFunction("Operazione annullata")
                }
                return
            })
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
        console.log(this.post?.username)
    }
})
</script>

<template>
    <div v-if="post" class="px-4 rounded border" ref="myTextarea">
        <p class="p-3 border-bottom">
            Domanda {{ post?.id_domanda }} Di <b class="text-info">{{ post?.username
            }}</b> • {{ new
    Date(post?.data
        ??
        "").toLocaleDateString() }}
            <img v-if="isFirst && popular" class="display-inline" src="../../public/img/fireIcon.png">
        </p>
        <p class="fs-4 p-3 border_bottom">
            {{ post?.testo_domanda }}
        </p>
        <div v-if="canDelete" class="not-prose flex justify-end gap-2 mb-5">
            <button class="btn bg-danger float-end text-white-hover" @click="showAlert">Elimina post</button>
        </div>
        <div v-if="answers">
            <AnswerItem v-for="answer in answers" class="d-grid mb-4" :key="answer.id_domanda" :answer="answer"
                :canDelete="(answer.id_utente == utente?.id_utente || utente?.ruolo == 'admin')" @delete="refreshPage()"
                :popular="popular" />
            <button ref="postAComment" v-if="commenting != 'true' && utente && !popular" @click="postAComment()"
                class="btn bg-success text-white mb-2">Posta un
                commento!</button>
            <div v-else-if="commenting == 'true'" class="my-5">
                <p>Posta un commmento</p>
                <textarea v-model="newComment" maxlength="700"></textarea>
                <button @click="sendComment()" class="btn bg-success text-white my-2">Invia</button>
                <button @click="cancelCommentOp()" class="btn bg-danger text-white ms-3 my-2">Annulla</button>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
textarea {
    width: 100%;
    height: 8rem;
}

div.border {

    //border-color: rgba(0, 141, 201, 1);
    border-color: black;

    .light-theme & {
        background-color: #e8e2c8;
    }
}

img {
    width: 20px;
    height: 20px;
}
</style>
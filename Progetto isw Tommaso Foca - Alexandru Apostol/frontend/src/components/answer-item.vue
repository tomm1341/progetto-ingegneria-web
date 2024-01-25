<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { Utente } from '../types'
import Swal from 'sweetalert2'
import { response } from 'express'

export default defineComponent({
    props: {
        answer: Object,
        canDelete: Boolean,
        popular: Boolean,
    },
    data() {
        return {
            modifica: false,
            editText: "",
            canEdit: false,
            currentDate: "",
            userId: 0,
        }
    },

    methods: {
        checkInput(): boolean {
            if (this.editText.trim() === ' ' || this.editText.trim() === '') {
                this.errorFunction("Il campo deve contenere del testo")
                this.modifica = false
                return false
            } else return true
        },
        handleClickOutside(event: any) {
            const textArea = this.$refs.myTextarea as any
            if (this.modifica == true && !textArea.contains(event.target)) {
                this.modifica = !this.modifica;
                setTimeout(() => document.removeEventListener('click', this.handleClickOutside), 100)
            }
        },
        async deleteComment() {
            await axios.delete(`/api/answers/${this.answer?.id_risposta}`)
            this.successFunction("Commento eliminato con successo")
            setTimeout(() => {
                this.$emit("delete")
            }, 1500);
        },
        editComment() {
            this.modifica = true
            this.editText = this.answer?.testo_risposta
            setTimeout(() => document.addEventListener('click', this.handleClickOutside), 100)
        },
        async confirmEdit() {
            if (this.checkInput())
                try {
                    await axios.post(`/api/forum/editComment`, {
                        testo_risposta: this.editText,
                        data: new Date(),
                        id: this.answer?.id_risposta
                    })
                    this.modifica = false
                    window.location.reload()
                } catch (resp: any) {
                    if (resp)
                        this.successFunction(resp.data.toString())
                }
        },
        cancelEditing() {
            this.modifica = false;
            this.errorFunction("Operazione annullata")
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
                text: 'Sei sicuro di voler eliminare questo commento?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'Annulla'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteComment()
                } else {
                    this.errorFunction("Operazione annullata")
                }
                return
            })
        },
        async getUser() {
            try {
                const response = await axios.get("/api/profile")
                this.userId = response.data.id_utente
            } catch (error: any) {

            }
        }
    },
    mounted() {
        this.getUser()
    },
})

</script>


<template>
    <div v-if="!modifica" id="outer-div" class="px-4 rounded border border-slate-200">
        <p class="text-sm p-2">
            Risposta {{ answer?.id_risposta }} di <span class="text-secondary">{{ answer?.username ?? 'N/A' }}</span> •
            {{ answer?.data ? new Date(answer?.data).toLocaleDateString() : 'N/A' }}
        </p>
        <p>
            {{ answer?.testo_risposta }}
        </p>
        <div class="not-prose flex justify-end gap-2 mb-3">
            <button v-if="canDelete && !popular" class="btn bg-warning" @click="showAlert">Elimina commento</button>
            <a v-if="userId === answer?.id_utente && !popular" class="float-end" @click="editComment">Modifica</a>
        </div>
    </div>
    <div v-else-if="modifica" ref="myTextarea">
        <p>Modifica commento</p>
        <textarea v-model="editText" maxlength="700" required></textarea>
        <div class="row my-5">
            <button @click="confirmEdit" class="btn bg-success text-white float-end col-3 mt-3 mx-3">Conferma</button>
            <button @click="cancelEditing" class="btn bg-danger text-white float-end col-2 mt-3">Annulla</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.light-theme {
    & div#outer-div {
        background-color: rgba(255, 255, 255, 0.561);
    }
}

.dark-theme {
    & div#outer-div {
        background-color: rgba(0, 0, 1, 0.5);
    }
}

a:hover {
    text-decoration: underline;
    cursor: pointer;
}

textarea {
    width: 100%;
    height: 8rem;
}
</style>
<template>
    <div class="container" id="app1">
        <h1 class="text-center mt-5">Nuova Domanda</h1>
        <form @submit.prevent="inviaDati" autocomplete="off" class="align-items-center text-center">
            <div class="form-floating mx-5 row ">
                <textarea v-model="testo_domanda" type="text" id="domanda" name="testo_domanda" class="form-control mb-3"
                    placeholder="Domanda" maxlength="900" required></textarea>
                <label for="testo_domanda" class="text-secondary">Scrivi qui la tua domanda</label>
            </div>

            <div class="col-2 ms-5">
                <input class="btn add-btn bg-success" type="submit" value="Pubblica" id="publish" />
            </div>
        </form>
        <div class="container-fluid" style="width:100%; height: 70px;"></div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import Swal from 'sweetalert2'


export default defineComponent({
    data() {
        return {
            errorMessage: "",
            testo_domanda: "",
        }
    },
    methods: {
        checkInput(): boolean {
            if (this.testo_domanda.trim() === ' ' || this.testo_domanda.trim() === '') {
                this.errorFunction("Il campo deve contenere del testo")
                return false
            } else return true
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
        async inviaDati() {
            if (this.testo_domanda === undefined || this.testo_domanda.trim() == "" || this.testo_domanda.trim() === " ") {
                this.errorFunction("Inserire almeno una domanda");
                return;
            }
            try {
                await axios.post("/api/newQuestion", {
                    testo_domanda: this.testo_domanda,
                });
                window.location.href = "/forum"
            } catch (error: any) {
                if (error.response) {
                    this.errorMessage = error;
                    console.log(error)
                }
            }
        },
    },
})

</script>




<style lang="scss" scoped>
textarea#domanda {
    height: 300px;
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
<template>
    <div v-if="!modifica" class="container">
        <h1 class="text-center mt-4">Informazioni utente</h1>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <ul class="my-5 p-4 rounded">
                    <li class="border-bottom p-2"><b>Nome:</b> {{ utente.nome }}</li>
                    <li class="border-bottom p-2"><b>Cognome:</b> {{ utente.cognome }}</li>
                    <li class="border-bottom p-2"><b>Username:</b> {{ utente.username }}</li>
                    <li class="border-bottom p-2"><b>Email:</b> {{ utente.email }}</li>
                    <li class="border-bottom p-2"><b>Età:</b> {{ utente.eta }}</li>
                    <li class="border-bottom p-2"><b>Genere:</b> {{ utente.genere }}</li>
                    <li class="border-bottom p-2"><b>Professione:</b> {{ utente.professione }}</li>
                    <li class="border-bottom p-2"><b>Ruolo:</b> {{ utente.ruolo }}</li>
                </ul>
                <input v-if="!modifica" @click="modifica = true"
                    class="btn bg-warning col-12 col-lg-4 col-xl-2 overflow-visible" type="button" value="Modifica Dati">
                <input @click="showAlert()" class="btn bg-danger col-12 col-lg-4 col-xl-2 ms-lg-3 overflow-visible"
                    type="button" value="Elimina Utente">
            </div>
            <div class="col-2"></div>
        </div>
    </div>
    <div v-if="modifica" class="container overflow-auto">
        <div class="float-center align-items-center text-center">
            <h1 class="text-center text-black pt-4 mt-5">Modifica Dati</h1>
            <div class="row">
                <div v-if="errorMessage" id="errorMessage" class="my-3 rounded text-center">{{ errorMessage }}</div>
                <form @submit.prevent="inviaDati" autocomplete="off" class="ps-lg-5 align-items-center text-center"
                    id="form2">
                    <div class="form-floating ms-5 col-11 col-md-10 me-0">
                        <input v-model="nome" type="text" id="nome" name="nome" class="form-control" placeholder="nome"
                            maxlength="25" required />
                        <label for="nome" class="text-secondary">Nome</label>
                    </div>
                    <div class="form-floating ms-5 col-11 col-md-10 me-0">
                        <input v-model="cognome" type="text" id="cognome" name="cognome" class="form-control"
                            placeholder="cognome" maxlength="25" required />
                        <label for="cognome" class="text-secondary">Cognome</label>
                    </div>
                    <div class="form-floating ms-5 col-11 col-md-10 me-0">
                        <input v-model="username" type="text" id="username" name="username" class="form-control"
                            placeholder="Username" maxlength="12" required />
                        <label for="username" class="text-secondary">Username</label>
                    </div>
                    <div class="form-floating ms-5 col-11 col-md-10 me-0">
                        <input v-model="email" type="email" id="email" name="email" class="form-control"
                            placeholder="name@example.com" maxlength="50" required />
                        <label for="email" class="text-secondary">Email</label>
                    </div>
                    <div class="form-floating ms-5 mb-4 col-11 col-md-10 me-0">
                        <select v-model="genere" id="genere" name="genere" class="form-select" required>
                            <option value="" selected disabled>Seleziona un'opzione</option>
                            <option value="maschio">Maschio</option>
                            <option value="femmina">Femmina</option>
                            <option value="altro">Altro</option>
                        </select>
                        <label for="genere" class="text-secondary">Genere</label>
                    </div>
                    <div class="form-floating ms-5 col-11 col-md-10 me-0">
                        <input v-model="eta" type="number" id="età" name="età" class="form-control" placeholder="Età"
                            v-positive-number maxlength="3" @input="checkAge(eta)" required />
                        <label for="età" class="text-secondary">Età</label>
                    </div>
                    <div class="form-floating ms-5 col-11 col-md-10 me-0">
                        <input v-model="professione" type="professione" id="professione" name="professione"
                            class="form-control" placeholder="Professione" maxlength="15" />
                        <label for="professione" class="text-secondary">Professione</label>

                        <input class="btn add-btn col-12 col-lg-4 col-xl-2 ms-lg-3 overflow-visible" type="submit"
                            value="Invia" id="invia" />
                        <input class="btn add-btn btn-warning col-12 col-lg-4 col-xl-2 ms-lg-3 overflow-visible"
                            type="cancel" value="Annulla" @click="cancelOp" />
                    </div>
                </form>
                <div class="col-2" id="fill"></div>
            </div>
        </div>
    </div>
    <div class="container-fluid" id="fill" style="width:100%; height: 70px;"></div>
</template>


<script lang="ts">
import axios from 'axios'
import { PropType, defineComponent, toHandlers, useTransitionState } from 'vue'
import { Utente } from '../types'
import Swal from 'sweetalert2'

export default defineComponent({
    props: {
        user: Object as PropType<Utente>
    },
    data() {
        return {
            utente: {} as Utente,
            id_utente: this.user?.id_utente,
            maxAge: 110,
            errorMessage: "",
            nome: "",
            cognome: "",
            username: "",
            email: "",
            genere: "",
            eta: "",
            professione: "",
            modifica: false
        }
    },
    methods: {

        async inviaDati() {
            try {
                await axios.post("/api/users/edit", {
                    nome: this.nome,
                    cognome: this.cognome,
                    username: this.username,
                    email: this.email,
                    eta: this.eta,
                    genere: this.genere,
                    professione: this.professione,
                })
            } catch (error: any) {
                if (error) {
                    this.errorFunction(error.response.data.toString())
                    return
                }
            }
            this.modifica = false;
            this.getUser()
            this.successFunction(`Dati modificati con successo!`);
        },
        showAlert() {
            Swal.fire({
                title: 'Attenzione!',
                text: 'Sei sicuro di voler eliminare il tuo account?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'Annulla'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteUser()
                } else if (result.isDenied) {
                    this.errorFunction("Operazione annullata")
                    return
                }
            })
        },
        async getUser() {
            await axios.get(`/api/profile/${this.user?.id_utente}`)
                .then(response => this.utente = response.data)
            this.nome = this.utente.nome
            this.cognome = this.utente.cognome
            this.username = this.utente.username
            this.email = this.utente.email
            this.genere = this.utente.genere
            this.eta = this.utente.eta as any
            this.professione = this.utente.professione
        },
        async deleteUser() {
            try {
                await axios.delete(`/api/usersList/${this.id_utente}`)
                this.successFunction(`Utente eliminato con successo!`)
                setTimeout(() => {
                    this.logout()
                }, 1000)
            } catch (error: any) {
                if (error.response) {
                    this.errorMessage = error.response.data
                }
            }
        },
        async logout() {
            await axios.post("/api/logout")
            window.location.reload()
        },
        checkAge(newValue: string): void {
            if (newValue === '') {
                this.eta = newValue;
            }
            else if (isNaN(Number(newValue))) {
                this.errorFunction(`Questo campo accetta solo numeri!`)
                this.eta = ''
                return
            } else if (Number(newValue) <= this.maxAge) {
                this.eta = newValue;
            } else {
                this.errorFunction(`L'età non può superare i ${this.maxAge} anni!`)
                this.eta = this.eta.toString().slice(0, 2); // taglia la stringa a 2 caratteri
            }
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
        cancelOp() {
            this.modifica = false
            this.errorFunction("Operazione annullata")
        }
    },
    mounted() {
        this.getUser()
    },
})

</script>

<style lang="scss" scoped>
/*Per non visualizzare le freccette nell'input dell'età*/
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input#invia {
    background-color: #DC3545;
}

ul {

    &>li {
        list-style-type: none;
    }
}

.light-theme {
    & ul {
        background-color: whitesmoke;
    }
}

.dark-theme {
    & ul {
        background-color: #7C5C77;
    }
}

@media(max-width:580px) {
    form#form2 {
        padding-right: 15% !important;
    }
}

@media(min-height: 1000px) {
    div#fill {
        margin-top: 20% !important;
    }
}
</style>
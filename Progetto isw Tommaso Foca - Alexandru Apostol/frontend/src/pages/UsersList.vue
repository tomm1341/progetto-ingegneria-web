<template>
    <div class="container">
        <h1 class="text-center mt-4">
            Lista degli utenti
        </h1>
        <div class="row">
            <table class="table table-hover">
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Cognome</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th style="width: 50px;">Età</th>
                    <th>Genere</th>
                    <th>Professione</th>
                    <th>Ruolo</th>
                    <th></th>
                </tr>
                <tr v-for="user in users" class="table-row">
                    <td>{{ user.id_utente }}</td>
                    <td>{{ user.nome }}</td>
                    <td>{{ user.cognome }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.eta }}</td>
                    <td>{{ user.genere }}</td>
                    <td>{{ user.professione }}</td>
                    <td>{{ user.ruolo }}</td>
                    <td v-if="user.ruolo != `admin`" @click.capture="idUtente = user.id_utente" @click="showAlert"
                        class="pt-3 px-1"><input type="button" id="delete" value="Elimina" class="btn px-2" /></td>
                    <td v-else class="pt-5 px-1"></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { Utente } from '../types'
import Swal from "sweetalert2"

export default defineComponent({
    data() {
        return {
            users: [] as Utente[],
            idUtente: {} as Utente["id_utente"],
        }
    },
    methods: {
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
                    this.deleteUser()
                } else {
                    this.errorFunction("Operazione annullata")
                }
                return
            })
        },
        async getUsers() {
            try {
                await axios.get("/api/usersList")
                    .then(response => this.users = response.data)
            } catch (error: any) {
                if (error.response) {
                    this.errorFunction(error.response.data.toString())
                }
            }
        },
        async deleteUser() {
            try {
                await axios.delete(`/api/usersList/${this.idUtente}`)

            } catch (error: any) {
                if (error.response) {
                    this.errorFunction(error.response.data.toString())
                }
            }
            this.successFunction("Utente eliminato con successo")
            this.getUsers()
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
            this.getUsers()
        },
    },
    mounted() {
        this.getUsers()
    },
})
</script>

<style lang="scss" scoped>
th,
td,
tr {
    overflow: show;
}

tr>td>input {
    &#delete {
        background-color: #DC3545;

        &:hover {
            background-color: rgba(220, 53, 69, 0.5);
        }
    }
}

.light-theme {
    table>tr {
        &>th {
            background-color: rgba(0, 137, 201, 0.5);
            padding: 1%
        }

        &>td {
            padding: 1%
        }

        &:nth-child(even) {
            background-color: #d1cdba;
        }
    }
}

.dark-theme {
    table>tr {
        &>th {
            background-color: rgba(84, 137, 150, 0.5);
            padding: 1%
        }

        &>td {
            padding: 1%
        }

        &:nth-child(even) {
            background-color: #545263;
        }
    }
}

@media(max-width:1000px) {
    div.row {
        overflow-x: scroll;
    }

    th:nth-child(1) {
        padding: 15px !important;
    }
}
</style>
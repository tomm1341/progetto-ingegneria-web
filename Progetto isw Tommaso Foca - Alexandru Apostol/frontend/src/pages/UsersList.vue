<template>
    <div class="container overflow-x-scroll">
        <h1 class="text-center mt-4">
            Lista degli utenti
        </h1>
        <div v-if="errMessage" id="errorMessage" class="my-3 rounded text-center">{{ errMessage }}</div>
        <table class="table table-hover">
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Cognome</th>
                <th>Username</th>
                <th>Email</th>
                <th>Età</th>
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
                <td v-if="user.ruolo != `admin`" @click.capture="idUtente = user.id_utente" @click="deleteUser"
                    class="pt-3 px-1"><input type="button" id="delete" value="Delete" class="btn px-2" /></td>
                <td v-else class="pt-5 px-1"></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { PropType, defineComponent } from 'vue';
import { Utente } from '../types'

export default defineComponent({
    data() {
        return {
            users: [] as Utente[],
            errMessage: "",
            idUtente: {} as Utente["id_utente"],
        }
    },
    methods: {
        async getUsers() {
            try {
                await axios.get("/api/usersList")
                    .then(response => this.users = response.data)
            } catch (error: any) {
                if (error.response) {
                    this.errMessage = error.response.data
                }
            }
        },
        async deleteUser() {
            try {
                await axios.delete(`/api/usersList/${this.idUtente}`)
            } catch (error: any) {
                if (error.response) {
                    this.errMessage = error.response.data
                }
            }
        }
    },
    mounted() {
        this.getUsers();
        if (this.errMessage) {
            setTimeout(() => {
                this.errMessage = "";
            }, 3000); // dopo 3 secondi la variabile errore torna vuota e il banner scompare
        }
    }
})
</script>

<style lang="scss" scoped>
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
</style>
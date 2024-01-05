<template>
    <div v-if="user" class="container" id="app1">
        <h1 class="text-center mt-5">Nuova Domanda</h1>
        <form @submit.prevent="inviaDati" autocomplete="off" class="align-items-center text-center">
            <div class="form-floating ms-5 row me-0">
                <textarea type="text" id="domanda" name="testo_domanda" class="form-control mb-3" placeholder="Domanda"
                    required></textarea>
                <label for="testo_domanda" class="text-secondary">Scrivi qui la tua domanda</label>
            </div>

            <div class="col-2 ms-5">
                <input class="btn add-btn bg-success" type="submit" value="Pubblica" id="publish" />
            </div>
        </form>
    </div>
    <div v-else class="container" id="app1">
        <h1>È necessario effettuare il login per creare una domanda</h1>
        <h2>
            <RouterLink to="/login">Fai click qui per la pagina del login!</RouterLink>
        </h2>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

interface MakeQuestionComponent extends ReturnType<typeof defineComponent> {
    user: any; // Puoi specificare un tipo più preciso per l'utente
}

export default defineComponent({
    data() {
        return {
            errorMessage: null,
            dataDomanda: new Date().toISOString().split('T')[0], // Inizializza con la data corrente
            idUtente: "",
            testo_domanda: "",
            user: null,
        }
    },
    methods: {
        async inviaDati() {
            //const user = this.$route.params.user;
            try {
                await axios.post("/api/newQuestion", {
                    data_creazione: this.dataDomanda,
                    testo_domanda: this.testo_domanda
                })
                this.$router.push("/forum");
            } catch (error: any) {
                if (error.response) {
                    this.errorMessage = error;
                }
            }
        },
    },
    async beforeRouteEnter(to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded, next: any) {
        next((vm: MakeQuestionComponent) => {
            vm.user = to.meta.user;
        });
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
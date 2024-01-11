<script lang="ts">
import axios from "axios"
import { PropType, defineComponent } from "vue"
import { Utente } from "../types"

export default defineComponent({
    data() {
        return {
            username: "",
            role: ""
        }
    },
    props: {
        user: Object as PropType<Utente>,
    },
    methods: {
        async logout() {
            await axios.post("/api/logout")
            window.location.reload()
        },
    },
    mounted() {
        console.log(this.user?.ruolo)
    },
})
</script>

<template>
    <div v-if="user || username" :user="user" id="login-register">
        <span v-if="user?.ruolo == `admin`" id="username" class="text-sm ms-2 text-danger">{{ user?.username }}</span>
        <span v-else class="text-sm ms-2">{{ user?.username }}</span>
        <button class="btn !px-2" @click="logout">
            Logout
        </button>
    </div>
    <div v-else>
        <div id="btns">
            <RouterLink to="/login" class="btn" id="else">Login</RouterLink>
            <RouterLink to="/register" class="btn" id="else">Registrati</RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media(min-width: 1600px) {
    span#username {
        display: block;
        margin-left: 15%;
    }
}
</style>
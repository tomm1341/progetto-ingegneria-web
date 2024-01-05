<script lang="ts">
import axios from "axios"
import { PropType, defineComponent } from "vue"
import { Utente } from "../types"

export default defineComponent({
    props: {
        user: Object as PropType<Utente>,
    },
    methods: {
        async logout() {
            await axios.post("/api/logout")
            window.location.reload()
        },
    },
})
</script>

<template>
    <span class="text-sm">{{ user?.username }}</span>
    <!--<div class="h-9 w-9 flex rounded-full"
        :class="{ 'bg-blue-500': user?.ruolo != 'admin', 'bg-rose-500': user?.ruolo == 'admin' }">
    </div>-->
    <button class="btn !px-2" @click="logout">
        Logout
    </button>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { Risposta } from '../types'

export default defineComponent({
    props: {
        answer: Object,
        canDelete: Boolean,
    },

    methods: {
        async deleteAnswer() {
            await axios.delete(`/api/answers/${this.answer?.id_risposta}`)
            this.$emit("delete")
        }
    },
})

</script>


<template>
    <div id="outer-div" class="px-4 rounded border border-slate-200">
        <p class="text-sm p-2">
            Risposta {{ answer?.id_risposta }} di {{ answer?.username ?? 'N/A' }} •
            {{ answer?.data ? new Date(answer?.data).toLocaleDateString() : 'N/A' }}
        </p>
        <p>
            {{ answer?.testo_risposta }}
        </p>
        <div v-if="canDelete" class="not-prose flex justify-end gap-2 mb-3">
            <button class="btn bg-warning" @click="deleteAnswer">Elimina commento</button>
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
</style>
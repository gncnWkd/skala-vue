<script setup>
import { useConfigStore } from '@/stores/configStore.js';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()
const configStore = useConfigStore()

const isButtonDisabled = computed(() => {
    return route.path === '/' || route.path.includes('/weather')
})
</script>

<template>
    <div class="container">
        <p v-if="isButtonDisabled">
            날씨단위: {{ configStore.unit }}({{ configStore.unitSymbol }})
            <button @click="configStore.toggleUnit" >단위변경</button>
        </p>
        
    </div>
</template>

<style scoped>
button {
    background-color: rgb(40, 44, 51);
    color: white;
    font-weight: 800;
    border-radius: 4px;
    padding: 3px 6px;
}
</style>
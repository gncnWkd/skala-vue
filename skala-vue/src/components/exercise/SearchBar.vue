<script setup>
    import {ref} from 'vue' 

    const props = defineProps({
        currentQuery: String
    })

    const emit = defineEmits(['update-query'])
    const searchQuery = ref(props.currentQuery)

    const sendSearchQuery = (e) => {
        searchQuery.value = e.target.value
        emit('update-query', searchQuery.value)
    }
    
</script>

<template>
    <div class="search-bar">
        <h3>🔍 도시 검색 (한글 즉시 동기화)</h3>
            <input type="text" :value="searchQuery" @input="sendSearchQuery" placeholder=" 검색할 도시 이름 입력" style="width:500px; height:30px"/>
            <p>검색 중인 도시: {{ searchQuery }}</p>
    </div>
</template>

<style scoped>
    input {
        margin: 8px 0 0 0;
    }
</style>
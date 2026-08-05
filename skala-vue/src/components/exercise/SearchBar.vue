<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ currentQuery: { type: String, default: '' } })
const emit = defineEmits(['update-query'])
const searchQuery = ref(props.currentQuery)

watch(() => props.currentQuery, (value) => { searchQuery.value = value })
const sendSearchQuery = (value) => emit('update-query', value)
</script>

<template>
  <el-input v-model="searchQuery" class="search-bar" size="large" clearable placeholder="도시 이름으로 날씨를 찾아보세요" @update:model-value="sendSearchQuery">
    <template #prefix>⌕</template>
    <template v-if="searchQuery" #suffix><el-tag size="small" effect="plain">{{ searchQuery }}</el-tag></template>
  </el-input>
</template>

<style scoped>
.search-bar :deep(.el-input__wrapper) { min-height: 48px; padding: 0 14px; background: var(--surface-soft); box-shadow: 0 0 0 1px var(--line) inset; }
.search-bar :deep(.el-input__wrapper.is-focus) { background: #fff; box-shadow: 0 0 0 1px #9abaff inset, 0 0 0 4px rgba(36, 107, 254, .1); }
.search-bar :deep(.el-input__prefix) { color: var(--primary); font-size: 22px; transform: rotate(-20deg); }
</style>

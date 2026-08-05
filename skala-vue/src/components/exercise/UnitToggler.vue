<script setup>
import { useConfigStore } from '@/stores/configStore.js'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const configStore = useConfigStore()
const showToggler = computed(() => route.path === '/' || route.path.includes('/weather'))
</script>

<template>
  <el-button
    v-if="showToggler"
    class="unit-toggle"
    @click="configStore.toggleUnit"
    :aria-label="`온도 단위를 ${configStore.unit === '섭씨' ? '화씨' : '섭씨'}로 변경`"
  >
    <span>{{ configStore.unitSymbol }}</span
    >&nbsp;
    <span class="unit-label">{{ configStore.unit }}</span>
  </el-button>
</template>

<style scoped>
.unit-toggle {
  height: auto;
  margin: 0;
  padding: 6px 9px 6px 6px;
  border-color: var(--line);
  border-radius: 10px;
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
  background: var(--surface);
  box-shadow: 0 4px 12px var(--button-shadow);
}
.unit-toggle span:first-child {
  display: grid;
  width: 25px;
  height: 25px;
  place-items: center;
  border-radius: 7px;
  color: var(--primary);
  background: var(--sky);
}
.unit-toggle:hover {
  border-color: var(--toggle-hover-border);
  color: var(--ink);
  background: var(--surface);
}
@media (max-width: 640px) {
  .unit-label {
    display: none;
  }
  .unit-toggle {
    padding-right: 6px;
  }
}
</style>

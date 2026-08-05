<script setup>
import { useConfigStore } from '@/stores/configStore.js'

const configStore = useConfigStore()
</script>

<template>
  <el-button
    class="dark-mode-toggle"
    :aria-label="configStore.isDarkMode ? '라이트 모드로 변경' : '다크 모드로 변경'"
    :aria-pressed="configStore.isDarkMode"
    @click="configStore.toggleDarkMode"
  >
    <span aria-hidden="true">{{ configStore.isDarkMode ? '☾' : '☀' }}</span>
    &nbsp;<span class="mode-label">{{ configStore.isDarkMode ? '다크' : '라이트' }}</span>
  </el-button>
</template>

<style scoped>
.dark-mode-toggle {
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
.dark-mode-toggle span:first-child {
  display: grid;
  width: 25px;
  height: 25px;
  place-items: center;
  border-radius: 7px;
  color: var(--theme-icon);
  background: var(--theme-icon-background);
  font-size: 17px;
  line-height: 1;
}
.dark-mode-toggle:hover {
  border-color: var(--toggle-hover-border);
  color: var(--ink);
  background: var(--surface);
}
@media (max-width: 640px) {
  .mode-label {
    display: none;
  }
  .dark-mode-toggle {
    padding-right: 6px;
  }
}
</style>

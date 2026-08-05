<template>
  <el-card class="dashboard-card" shadow="never">
    <slot />
  </el-card>
</template>

<style scoped>
.dashboard-card {
  border-color: var(--line);
  border-radius: 20px;
  background: var(--surface);
  box-shadow: 0 8px 22px rgba(27, 55, 100, 0.035);
}
:deep(.el-card__body) {
  padding: 22px;
  background: var(--surface);
}
@media (max-width: 640px) {
  .dashboard-card {
    border-radius: 16px;
  }
  :deep(.el-card__body) {
    padding: 17px;
  }
}
</style>

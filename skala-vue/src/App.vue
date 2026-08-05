<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'
import DarkModeToggler from './components/exercise/DarkModeToggler.vue'
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="brand" aria-label="날씨바바 홈">
      <span class="brand-mark">☀</span>
      <span>
        <strong>날씨바바
        </strong>
        <small>Weather dashboard</small>
      </span>
    </RouterLink>

    <div class="header-actions">
      <el-menu class="app-menu" mode="horizontal" :ellipsis="false" :router="true" :default-active="$route.path" aria-label="주요 메뉴">
        <el-menu-item index="/">대시보드</el-menu-item>
        <el-menu-item index="/favorites">즐겨찾기</el-menu-item>
        <el-menu-item index="/about">서비스 소개</el-menu-item>
      </el-menu>
      <UnitToggler />
      <DarkModeToggler />
    </div>
  </header>

  <main>
    <RouterView v-slot="{ Component }">
      <KeepAlive include="WeatherHomeView">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
</template>

<style scoped>
main { margin: 10px }
.app-header { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-bottom: 38px; }
.brand { display: inline-flex; align-items: center; gap: 11px; color: var(--ink); text-decoration: none; }
.brand-mark { display: grid; width: 42px; height: 42px; place-items: center; border-radius: 14px; color: #fff; font-size: 23px; background: linear-gradient(135deg, #ffba30, #ff7b39); box-shadow: 0 8px 20px rgba(255, 142, 54, .3); }
.brand strong, .brand small { display: block; }
.brand strong { font-size: 18px; line-height: 1.15; letter-spacing: -.04em; }
.brand small { margin-top: 2px; color: var(--muted); font-size: 11px; letter-spacing: .04em; text-transform: uppercase; }
.header-actions { display: flex; align-items: center; gap: 8px; }
.app-menu { height: 37px; border-bottom: 0; background: transparent; }
.app-menu :deep(.el-menu-item) { height: 37px; padding: 0 11px; border-bottom: 0 !important; border-radius: 9px; color: var(--muted); font-size: 14px; font-weight: 650; }
.app-menu :deep(.el-menu-item:hover), .app-menu :deep(.el-menu-item.is-active) { color: var(--primary); background: var(--sky); }
@media (max-width: 640px) { .app-header { align-items: flex-start; margin-bottom: 26px; } .header-actions { align-items: flex-end; flex-direction: column-reverse; gap: 8px; } .app-menu :deep(.el-menu-item) { height: 30px; padding: 0 7px; font-size: 13px; } .app-menu { height: 30px; } }
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import UnitToggler from './components/exercise/UnitToggler.vue';
</script>

<template>
  <h1>🌤️ 과제 4: 라우터 적용</h1>
  <br>
  <hr style="border: none; height:1px; background-color:lightgrey;" />
  <br>
  <div class="upperMenu" style="padding: 10px">
    <nav>
      <RouterLink to="/" active-class="active-link" exact-active-class="active-link">☀️ 날씨 대시보드</RouterLink>
      <RouterLink to="/about" active-class="active-link">ℹ️ 서비스 소개</RouterLink>
    </nav>
    <UnitToggler />
  </div>
  <br>
  <hr style="border:none; height:1px; background-color:lightgrey;" />
  <br>

  <div>
    <RouterView v-slot="{Component}">
      <KeepAlive include="WeatherHomeView">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </div>

  
</template>

<style scoped>
/* nav {
  text-align: center;
} */
nav a {
  color: rgb(82, 82, 82);
  text-decoration: none;
}
nav a+a {
  margin-left: 30px;
}
nav a:hover {
  border-radius: 4px;
  padding: 10px;
  color: #42b983;
}
.active-link {
  color: #42b983;
  font-weight: 700;
  text-decoration: underline 2px;
  text-underline-offset: 8px;
}
.upperMenu {
  display: flex;
}
.upperMenu > :last-child {
  margin-left: auto;
}
</style>
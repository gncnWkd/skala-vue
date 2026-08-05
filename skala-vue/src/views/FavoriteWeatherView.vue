<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '@/stores/weatherStore'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'

const router = useRouter()
const weatherStore = useWeatherStore()
const { favoriteWeatherData, favoriteCityIds, isLoading, error, weatherData } = storeToRefs(weatherStore)
const favoriteCities = computed(() => favoriteWeatherData.value.map((city) => ({
  ...city,
  isFavorite: favoriteCityIds.value.includes(city.id),
})))

const handleShowDetail = (cityId) => router.push(`/weather/${cityId}`)
const removeAllFavorites = () => favoriteCityIds.value.slice().forEach(weatherStore.toggleFavorite)

onMounted(() => {
  if (!weatherData.value.length) weatherStore.fetchWeatherList()
})
</script>

<template>
  <section class="favorite-page">
    <header class="page-hero">
      <div>
        <p class="eyebrow">MY LOCATIONS</p>
        <h1>즐겨찾는 지역의<br><em>날씨를 모아보세요.</em></h1>
        <p>별 아이콘을 눌러 저장한 지역은 이곳에서 언제든 관리할 수 있어요.</p>
      </div>
      <el-button v-if="favoriteCityIds.length" plain type="danger" @click="removeAllFavorites">모두 해제</el-button>
    </header>

    <section class="dashboard-section">
      <div class="section-heading">
        <div><p class="section-kicker">FAVORITE WEATHER</p><h2>내 즐겨찾기</h2></div>
        <p class="result-count">{{ favoriteCityIds.length }}개 도시</p>
      </div>
      <BaseDashboardCard>
        <el-skeleton v-if="isLoading && !weatherData.length" :rows="3" animated class="state-message" />
        <el-alert v-else-if="error" class="state-message" type="error" :closable="false" show-icon title="날씨 정보를 가져오지 못했습니다. 잠시 후 다시 시도해 주세요." />
        <el-empty v-else-if="!favoriteCityIds.length" :image-size="86" description="아직 즐겨찾는 지역이 없습니다.">
          <el-button type="primary" @click="router.push('/')">지역 둘러보기</el-button>
        </el-empty>
        <div v-else class="weather-grid">
          <WeatherCard v-for="item in favoriteCities" :key="item.id" :city-item="item" @show-detail="handleShowDetail" @toggle-favorite="weatherStore.toggleFavorite" />
        </div>
      </BaseDashboardCard>
    </section>
  </section>
</template>

<style scoped>
.favorite-page { padding-bottom: 8px; }
.page-hero { display: flex; align-items: flex-start; justify-content: space-between; gap: 28px; padding: 10px 2px; }
.eyebrow, .section-kicker { color: var(--primary); font-size: 11px; font-weight: 800; letter-spacing: .12em; }
.page-hero h1 { margin-top: 10px; font-size: clamp(32px, 5vw, 46px); font-weight: 800; letter-spacing: -.075em; line-height: 1.13; }
.page-hero h1 em { color: var(--primary); font-style: normal; }
.page-hero p:last-child { max-width: 470px; margin-top: 14px; color: var(--muted); }
.page-hero .el-button { margin-top: 12px; border-radius: 11px; font-weight: 700; }
.dashboard-section { margin-top: 30px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; margin-bottom: 11px; }
.section-heading h2 { margin-top: 1px; font-size: 20px; font-weight: 800; letter-spacing: -.04em; }
.result-count { color: var(--muted); font-size: 13px; }
.weather-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.state-message { margin: 10px 0; }
@media (max-width: 850px) { .weather-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .page-hero { flex-direction: column; gap: 13px; padding-bottom: 18px; }.page-hero .el-button { margin-top: 0; }.weather-grid { grid-template-columns: 1fr; } }
</style>

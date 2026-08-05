<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '@/stores/weatherStore'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'

const router = useRouter()
const weatherStore = useWeatherStore()
const { weatherData, isLoading, error, favoriteCityIds } = storeToRefs(weatherStore)
const searchQuery = ref('')
const statusMessage = ref('도시 카드를 선택하면 더 자세한 날씨를 볼 수 있어요.')
const filteredWeatherList = computed(() => weatherData.value
  .filter((item) => item.name.includes(searchQuery.value.trim()))
  .map((item) => ({ ...item, isFavorite: favoriteCityIds.value.includes(item.id) })))

const handleFetchWeather = () => weatherStore.fetchWeatherList()
const handleSelectCity = (name) => { statusMessage.value = `${name}의 날씨 요약을 확인하고 있어요.` }
const handleShowDetail = (cityId) => router.push(`/weather/${cityId}`)
onMounted(handleFetchWeather)
</script>

<template>
  <div class="weather-home">
    <section class="hero">
      <div>
        <p class="eyebrow"><span></span> LIVE WEATHER</p>
        <h1 style="line-height:50px;">오늘의 하늘,<br><em>한눈에 살펴보세요.</em></h1>
        <p class="hero-description">주요 도시의 현재 기상 정보를 빠르고 깔끔하게 확인할 수 있습니다.</p>
      </div>
      <el-button class="refresh-button" plain type="primary" :loading="isLoading" @click="handleFetchWeather">
        <span :class="{ spinning: isLoading }">↻</span>&nbsp;{{ isLoading ? '날씨 불러오는 중' : '새로고침' }}
      </el-button>
    </section>

    <section class="dashboard-section">
      <div class="section-heading">
        <div><p class="section-kicker">CITY SEARCH</p><h2>도시 검색</h2></div>
      </div>
      <BaseDashboardCard><SearchBar :current-query="searchQuery" @update-query="searchQuery = $event" /></BaseDashboardCard>
    </section>

    <section class="dashboard-section overview-grid">
      <BaseDashboardCard class="weather-map">
        <div class="map-copy"><p class="section-kicker">KOREA WEATHER</p>
          <h2>전국 날씨 관측</h2>
          <p>서울을 중심으로 실시간 데이터를 수집하고 있어요.</p><br/>
          <iframe width="600" height="400" src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=7&overlay=temp&product=ecmwf&level=surface&lat=36.72&lon=127.752" frameborder="0"></iframe>
        </div>
      </BaseDashboardCard>
      <aside class="tip-card">
        <div class="tip"><span>✦</span><div><strong>날씨 단위 변경</strong><p>상단의 °C 버튼을 눌러 화씨로 바꿔볼 수 있어요.</p></div></div>
        <div class="tip"><span>✦</span><div><strong>기온 지도</strong><p>전국 기온 지도를 살펴볼 수 있어요.</p></div></div>
        <div class="tip"><span>✦</span><div><strong>지역별 상세 날씨</strong><p>날씨 카드의 상세보기를 누르면 자세한 날씨 정보를 볼 수 있어요.</p></div></div>
        <div class="tip"><span>✦</span><div><strong>즐겨찾기</strong><p>자주 찾는 지역을 즐겨찾기에 추가할 수 있어요.</p></div></div>
      </aside>

    </section>

    <section class="dashboard-section">
      <div class="section-heading"><div><p class="section-kicker">LOCAL WEATHER</p><h2>지역별 날씨</h2></div><p class="result-count">{{ filteredWeatherList.length }}개 도시</p></div>
      <BaseDashboardCard>
        <el-skeleton v-if="isLoading && !weatherData.length" :rows="3" animated class="state-message" />
        <el-alert v-else-if="error" class="state-message" type="error" :closable="false" show-icon title="날씨 정보를 가져오지 못했습니다. 잠시 후 다시 시도해 주세요." />
        <el-empty v-else-if="!filteredWeatherList.length" class="state-message" :image-size="72" description="일치하는 도시가 없습니다." />
        <div v-else class="weather-grid"><WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" @select-city="handleSelectCity" @show-detail="handleShowDetail" @toggle-favorite="weatherStore.toggleFavorite" /></div>
      </BaseDashboardCard>
    </section>

    <el-alert class="status-region" type="success" :closable="false" show-icon :title="statusMessage" />
  </div>
</template>

<style scoped>
.weather-home { padding-bottom: 8px; }
.hero { display: flex; justify-content: space-between; gap: 28px; padding: 10px 2px 10px; }
.eyebrow, .section-kicker { color: var(--primary); font-size: 11px; font-weight: 800; letter-spacing: .12em; }
.eyebrow span { display: inline-block; width: 6px; height: 6px; margin: 0 6px 1px 0; border-radius: 50%; background: #36bc88; }
.hero h1 { margin-top: 10px; font-size: clamp(32px, 5vw, 46px); font-weight: 800; letter-spacing: -.075em; line-height: 1.13; }
.hero h1 em { color: var(--primary); font-style: normal; }.hero-description { max-width: 455px; margin-top: 14px; color: var(--muted); }
.refresh-button { align-self: flex-start; height: 42px; margin-top: 12px; border-color: #ceddf9; border-radius: 11px; font-size: 13px; font-weight: 750; }
.refresh-button span { font-size: 18px; }
.spinning { animation: spin .8s linear infinite; }
.dashboard-section { margin-top: 28px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; margin-bottom: 11px; }
.section-heading h2, .map-copy h2 { margin-top: 1px; font-size: 20px; font-weight: 800; letter-spacing: -.04em; }
.result-count { color: var(--muted); font-size: 13px; }
.overview-grid { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 18px; }
.weather-map { position:relative; display: flex; align-items: left; min-height: 183px; overflow: hidden; background: linear-gradient(110deg, #eef5ff, #f9fbff); }
.map-copy { position: relative; z-index: 1; }
.map-copy > p:last-child { max-width: 270px; margin-top: 8px; color: var(--muted); font-size: 13px; }
.tip-card { display: grid; align-items: center; gap: 12px; padding: 20px; border-radius: 20px; color: #e8efff; background: linear-gradient(140deg, #2658c4, #4d79f2); box-shadow: var(--shadow); }
.tip-card  span { display: grid; flex: 0 0 auto; width: 34px; height: 34px; place-items: center; border-radius: 10px; background: rgba(255,255,255,.14); }
.tip-card strong { display: block; font-size: 14px; }
.tip-card .tip {display: flex; gap: 12px; padding-right: 5px;}
.tip-card p { margin-top: 3px; color: #c9d8ff; font-size: 12px; line-height: 1.45; }
.weather-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.state-message { margin: 10px 0; color: var(--muted); }
.status-region { margin-top: 18px; border: 1px solid #cdeedf; font-size: 13px; font-weight: 650; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 850px) { .weather-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }.overview-grid { grid-template-columns: 1fr; }.tip-card { min-height: 82px; } }
@media (max-width: 640px) { .hero { flex-direction: column; padding-bottom: 26px; gap: 13px; }.refresh-button { margin-top: 0; }.weather-grid { grid-template-columns: 1fr; }.section-heading h2 { font-size: 19px; } }
</style>

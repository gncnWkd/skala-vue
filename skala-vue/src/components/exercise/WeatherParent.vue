<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '인천', temp: 25, status: '맑음' },
])
const searchQuery = ref('')
const statusMessage = ref('카드를 클릭하거나 검색해 보세요.')
const selectedCityInfo = ref('')

const handleSelectCity = (name) => {
  statusMessage.value = `${name}이 선택되었습니다.`
  selectedCityInfo.value = name
}
watch(selectedCityInfo, () => {
  console.log(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${statusMessage.value}"`)
})
watchEffect(() => {
  console.log(
    `[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})
const handleShowDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
const filteredWeatherList = computed(() => {
  return weatherList.value.filter((p) => p.name.includes(searchQuery.value))
})
const handleSearch = (updatedQuery) => {
  searchQuery.value = updatedQuery
}
</script>

<template>
  <div class="weather-parent">
    <h1>🌤️ 과제 3: 날씨 (컴포넌트)</h1>
    <BaseDashboardCard title="날씨 정보 대시보드">
      <SearchBar :current-query="searchQuery" @update-query="handleSearch" />
    </BaseDashboardCard>
    <BaseDashboardCard>
      <WeatherCard
        :weather-list="filteredWeatherList"
        @select-city="handleSelectCity"
        @show-detail="handleShowDetail"
      />
    </BaseDashboardCard>
    <p class="statusRegion" id="statusBar">
      {{ statusMessage }}
    </p>
  </div>
</template>

<style scoped>
.statusRegion {
  border-radius: 8px;
  background-color: #e3ffe3;
  text-align: center;
  padding: 10px;
  color: #20902b;
  font-weight: bold;
}
</style>

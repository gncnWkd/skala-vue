<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'

const configStore = useConfigStore()
const weatherStore = useWeatherStore()
const { cityDetail, isLoading, error } = storeToRefs(weatherStore)
const route = useRoute()
const router = useRouter()
const displayTemp = computed(() => {
  if (!cityDetail.value) return ''
  const rawTemp = cityDetail.value.temp
  return configStore.unit === '화씨' ? `${Math.round((rawTemp * 9) / 5 + 32)}°F` : `${Math.round(rawTemp)}°C`
})
const weatherEmoji = () => {
  const status = cityDetail.value.status || ''
  if (status.includes('비') || status.includes('소나기')) return '🌧️'
  if (status.includes('눈')) return '❄️'
  if (status.includes('구름')) return '☁️'
  return '☀️'
}
watch(() => route.params.cityId, (cityId) => weatherStore.fetchWeatherDetail(cityId), { immediate: true })
</script>

<template>
  <section class="detail-page">
    <el-button class="back-button" link @click="router.push('/')">← 대시보드로 돌아가기</el-button>
    <el-skeleton v-if="isLoading" class="state-card" :rows="4" animated />
    <el-result v-else-if="error || !cityDetail" class="state-card" icon="error" title="지역 정보를 불러오지 못했습니다" sub-title="잠시 후 다시 시도해 주세요." />
    <template v-else>
      <header class="detail-hero">
        <div><p class="eyebrow">LOCAL WEATHER</p><h1>{{ cityDetail.name }} &nbsp; <span>현재 날씨</span></h1><p>{{ cityDetail.status }} · 실시간 기상 관측 정보</p></div>
        <div class="hero-temperature"><span>{{ weatherEmoji() }}</span><strong>{{ displayTemp }}</strong></div>
      </header>
      <el-descriptions class="metrics-card" :column="3" border direction="vertical">
        <el-descriptions-item label="💧 습도"><strong> {{ cityDetail.humidity }}<small>%</small></strong></el-descriptions-item>
        <el-descriptions-item label="〰 풍속"><strong> {{ cityDetail.wind }}<small>m/s</small></strong></el-descriptions-item>
        <el-descriptions-item label="☁ 기상 현황"><strong class="status-value"> {{ cityDetail.status }}</strong></el-descriptions-item>
      </el-descriptions>
      <p class="data-note">마지막 데이터 요청 기준 · OpenWeather 관측 데이터</p>
    </template>
  </section>
</template>

<style scoped>
.detail-page { max-width: 800px; margin: 0 auto; }
.back-button { margin-bottom: 22px; color: var(--muted); font-size: 13px; font-weight: 700; }
.detail-hero { display: flex; align-items: center; justify-content: space-between; gap: 30px; padding: 34px; border-radius: 24px; color: #fff; background: linear-gradient(130deg, #174dbd, #2e7dff); box-shadow: 0 20px 42px rgba(29, 89, 204, .24); }
.eyebrow { color: #b9d6ff; font-size: 11px; font-weight: 800; letter-spacing: .13em; }
.detail-hero h1 { margin-top: 7px; font-size: 32px; letter-spacing: -.06em; }
.detail-hero h1 span { color: #cce1ff; font-weight: 500; }
.detail-hero p:last-child { margin-top: 8px; color: #d7e6ff; }
.hero-temperature { display: flex; align-items: center; gap: 12px; }
.hero-temperature span { font-size: 38px; }
.hero-temperature strong { font-size: 42px; letter-spacing: -.07em; }
.metrics-card { margin-top: 18px; overflow: hidden; border-radius: 20px; box-shadow: 0 8px 22px rgba(27, 55, 100, .035); }
.metrics-card :deep(.el-descriptions__label) { color: var(--muted); font-weight: 600; }
.metrics-card :deep(.el-descriptions__content strong) { font-size: 25px; letter-spacing: -.05em; }
.metrics-card small { margin-left: 2px; color: var(--muted); font-size: 12px; }
.status-value { font-size: 18px !important; }
.data-note { margin-top: 14px; color: #909aab; font-size: 12px; text-align: center; }
.state-card { padding: 35px 20px; border: 1px solid var(--line); border-radius: 20px; background: var(--state-surface); }
@media (max-width: 640px) {
  .detail-hero { align-items: flex-start; flex-direction: column; padding: 25px; gap: 18px; }
  .metrics-card :deep(.el-descriptions__table) { display: block; }.metrics-card :deep(tbody),
  .metrics-card :deep(tr), .metrics-card :deep(td) { display: block; width: 100%; }
  .metrics-card :deep(.el-descriptions__cell) { border-width: 0 0 1px !important; }
  .metrics-card :deep(tr:last-child .el-descriptions__cell) { border-bottom: 0 !important; }
}
</style>

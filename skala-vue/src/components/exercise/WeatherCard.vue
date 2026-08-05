<script setup>
import { computed, ref } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({ cityItem: { type: Object, required: true } })
const emit = defineEmits(['select-city', 'show-detail', 'toggle-favorite'])
const configStore = useConfigStore()
const selectedCity = ref('')

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp
  return configStore.unit === '화씨'
    ? `${Math.round((rawTemp * 9) / 5 + 32)}°F`
    : `${Math.round(rawTemp)}°C`
})
const weatherEmoji = computed(() => {
  const status = props.cityItem.status || ''
  if (status.includes('비') || status.includes('소나기')) return '🌧️'
  if (status.includes('눈')) return '❄️'
  if (status.includes('구름')) return '☁️'
  return '☀️'
})
const sendSelectedCity = () => {
  selectedCity.value = props.cityItem.name
  emit('select-city', selectedCity.value)
}
</script>

<template>
  <el-card
    class="weather-card"
    shadow="never"
    tabindex="0"
    @click="sendSelectedCity"
    @keydown.enter="sendSelectedCity"
  >
    <div class="card-top">
      <div>
        <p class="city-name">{{ cityItem.name }}</p>
        <p class="weather-status">{{ cityItem.status }}</p>
      </div>
      <div class="card-actions">
        <el-button
          class="favorite-button"
          :class="{ 'is-favorite': cityItem.isFavorite }"
          circle
          :aria-label="
            cityItem.isFavorite
              ? `${cityItem.name} 즐겨찾기 해제`
              : `${cityItem.name} 즐겨찾기 추가`
          "
          :title="cityItem.isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'"
          @click.stop="emit('toggle-favorite', cityItem.id)"
        >
          <span aria-hidden="true">{{ cityItem.isFavorite ? '★' : '☆' }}</span>
        </el-button>
        <span class="weather-icon">{{ weatherEmoji }}</span>
      </div>
    </div>
    <p class="temperature">{{ displayTemp }}</p>
    <div class="card-footer">
      <el-tag size="small" effect="light" :type="cityItem.temp >= 25 ? 'danger' : 'info'">{{
        cityItem.temp >= 25 ? '따뜻한 날' : '선선한 날'
      }}</el-tag>
      <el-button link type="primary" size="small" @click.stop="emit('show-detail', cityItem.id)"
        >상세 보기 <span>→</span></el-button
      >
    </div>
  </el-card>
</template>

<style scoped>
.weather-card {
  min-width: 0;
  border-color: var(--line);
  border-radius: 16px;
  outline: none;
  background: linear-gradient(145deg, var(--card-gradient-start), var(--card-gradient-end));
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}
.weather-card :deep(.el-card__body) {
  padding: 18px;
}
.weather-card:hover,
.weather-card:focus {
  border-color: #b9cffc;
  box-shadow: 0 14px 25px rgba(31, 75, 150, 0.1);
  transform: translateY(-3px);
}
.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.city-name {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.03em;
}
.weather-status {
  margin-top: 2px;
  color: var(--muted);
  font-size: 13px;
}
.card-actions {
  display: flex;
  align-items: center;
  gap: 7px;
}
.favorite-button {
  width: 32px;
  height: 32px;
  border: 0;
  color: #91a0b8;
  background: var(--favorite-background);
  font-size: 20px;
}
.favorite-button.is-favorite {
  color: #f5a623;
  background: #fff5dc;
}
.favorite-button:hover {
  color: #f5a623;
  background: #fff5dc;
}
.favorite-button span {
  line-height: 1;
}
.weather-icon {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 12px;
  background: var(--weather-icon-background);
  font-size: 21px;
}
.temperature {
  margin: 19px 0 17px;
  font-size: 31px;
  font-weight: 760;
  letter-spacing: -0.06em;
  line-height: 1;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.el-tag {
  border-radius: 99px;
  font-size: 11px;
  font-weight: 750;
}
.el-button span {
  margin-left: 3px;
  font-size: 15px;
}
</style>

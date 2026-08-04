<script setup>
import { ref, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useConfigStore } from '@/stores/configStore';
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const configStore = useConfigStore()

const route = useRoute()
const router = useRouter()
const cityDetail = ref(null)
const cityNameMatch = {
    city_01: 'seoul',
    city_02: 'suwon',
    city_03: 'busan',
    city_04: 'incheon'
}
const cityNameKoreanMatch = {
    seoul: '서울',
    suwon: '수원',
    busan: '부산',
    incheon: '인천'
}

const cityName = cityNameMatch[route.params.cityId]

const displayTemp = computed(() => {
        const rawTemp = cityDetail.value.temp
        if (configStore.unit === '화씨') {
            return String(Math.round((rawTemp * 9) / 5 + 32))+'°F'
        }
        return String(rawTemp)+'°C'
    })

const handleFetchWeather = async () => {
    try {
        const result = await axios.get(BASE_URL + cityName + `&units=metric&lang=kr&appid=${API_KEY}`)
        cityDetail.value = {
            id: route.params.cityId,
            name: cityName,
            temp: result.data.main.temp,
            temp_feels: result.data.main.feels_like,
            status: result.data.weather[0].description,
            humidity: result.data.main.humidity,
            wind: result.data.wind.speed
        }
        console.log('WeatherDetailView에서 API 호출됨!')
    } catch (error) {
        console.error('통신 중 에러가 발생했습니다: ', error)
    }
}

const handleGoHome = () => {
    router.push('/')
}

watchEffect(() => {
    handleFetchWeather()
})

</script>

<template>
    <div class="container">
        <h3>📊 지역별 상세 기상 관측 정보</h3>
        <hr style="border:none; height:1px; background-color:lightgrey;" />
        <div v-if="cityDetail" class="detailCard">
            
            <p>📌 {{ cityNameKoreanMatch[cityDetail.name] }}</p>
            실시간 기온: {{ displayTemp }}<br />
            기상 현황: {{ cityDetail.status }}<br />
            대기 습도: {{ cityDetail.humidity }}%<br />
            현재 풍속: {{ cityDetail.wind }}m/s
        </div>
        <div v-else>
            <p>지역 정보를 찾을 수 없습니다.</p>
        </div>
        <button @click="handleGoHome">메인 대시보드로 돌아가기</button>
    </div>
</template>

<style scoped>
.container {
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    margin: 20px 0 20px 0;
    padding: 20px;
    background-color: white;
}
.detailCard {
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    margin: 20px 0 20px 0;
    padding: 20px;
    background-color: #f4f4f4;
    text-align: center;
    font-size: 20px;
}
p {
    font-weight: 900;
}
</style>
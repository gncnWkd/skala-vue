<script setup>
    import { ref, computed, watch, watchEffect, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
    import SearchBar from '../components/exercise/SearchBar.vue'
    import WeatherCard from '../components/exercise/WeatherCard.vue'

    const router = useRouter()
    const weatherData = ref([])
    const isLoading = ref(false)
    const searchQuery = ref('')
    const statusMessage = ref('카드를 클릭하거나 검색해 보세요.')
    const selectedCityInfo = ref('')
    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

    const handleFetchWeather = async () => {
        isLoading.value = true

        try {
            const [seoulRes, suwonRes, busanRes, incheonRes] = await Promise.all([
            axios.get(BASE_URL + `?q=seoul&units=metric&lang=kr&appid=${API_KEY}`),
            axios.get(BASE_URL + `?q=suwon&units=metric&lang=kr&appid=${API_KEY}`),
            axios.get(BASE_URL + `?q=busan&units=metric&lang=kr&appid=${API_KEY}`),
            axios.get(BASE_URL + `?q=incheon&units=metric&lang=kr&appid=${API_KEY}`)
            ])

            weatherData.value = [
                {
                    id: 'city_01',
                    name: '서울',
                    temp: seoulRes.data.main.temp,
                    temp_feels: seoulRes.data.main.feels_like,
                    status: seoulRes.data.weather[0].description,
                    humidity: seoulRes.data.main.humidity,
                    wind: seoulRes.data.wind.speed
                },
                {
                    id: 'city_02',
                    name: '수원',
                    temp: suwonRes.data.main.temp,
                    temp_feels: suwonRes.data.main.feels_like,
                    status: suwonRes.data.weather[0].description,
                    humidity: suwonRes.data.main.humidity,
                    wind: suwonRes.data.wind.speed
                },
                {
                    id: 'city_03',
                    name: '부산',
                    temp: busanRes.data.main.temp,
                    temp_feels: busanRes.data.main.feels_like,
                    status: busanRes.data.weather[0].description,
                    humidity: busanRes.data.main.humidity,
                    wind: busanRes.data.wind.speed
                },
                {
                    id: 'city_04',
                    name: '인천',
                    temp: incheonRes.data.main.temp,
                    temp_feels: incheonRes.data.main.feels_like,
                    status: incheonRes.data.weather[0].description,
                    humidity: incheonRes.data.main.humidity,
                    wind: incheonRes.data.wind.speed
                },
            ]
            console.log('WeatherHomeView에서 API 호출됨!')
        } catch (error){
            console.error('통신 중 에러가 발생했습니다: ', error)
        } finally {
            isLoading.value = false
        }
    }
    const handleSelectCity = (name) => {
        statusMessage.value = `${name}이 선택되었습니다.`
        selectedCityInfo.value = name;
    }
    watch(selectedCityInfo, () => {
        console.log(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${statusMessage.value}"`)
    })
    watchEffect(() => {
        console.log(`[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`)
    })
    const handleShowDetail = (cityId) => {
        router.push('/weather/' + cityId)
    }
    const filteredWeatherList = computed(() => {
        return weatherData.value.filter(p => p.name.includes(searchQuery.value))
    })
    const handleSearch = (updatedQuery) => {
        searchQuery.value = updatedQuery
    }
    onMounted(() => {
        handleFetchWeather()
    })
</script>

<template>
    <div class="weather-parent">
        <button @click="handleFetchWeather" :disabled="isLoading">
            {{ isLoading ? '데이터 로딩 중...' : '🔄 날씨 정보 업데이트' }}
        </button>
        <h3>🔍 도시 검색 (한글 즉시 동기화)</h3>
        <BaseDashboardCard title="날씨 정보 대시보드">
            <SearchBar :current-query="searchQuery" @update-query="handleSearch" />
        </BaseDashboardCard>
        <h3>🗺️ 지도</h3>
        <BaseDashboardCard>
            
            <iframe width="600" height="400" src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=8&overlay=wind&product=ecmwf&level=surface&lat=37.227&lon=127.924" frameborder="0"></iframe>
            <br>
        </BaseDashboardCard>
        <h3>🏙️ 지역별 날씨 현황</h3>
        <BaseDashboardCard>
            
            <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item"   @select-city="handleSelectCity" @show-detail="handleShowDetail"/>
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
    margin-bottom: 20px;
}    
button {
    margin-top: 0px;
    padding: 7px 10px;
    background-color: rgb(204, 244, 255);
    border: 1px solid rgb(216, 216, 216);
    border-radius: 5px;
    font-size: 14px;
}
button:hover {
    background-color: rgb(166, 197, 206);
}
</style>

<script setup>
import {ref, computed, watch, watchEffect, onMounted, onUpdated} from 'vue'
//import axios from 'axios'

//const cities = ['seoul', 'suwon', 'busan', 'incheon', 'gangneung']
//const weatherLists = ref([])
const weatherList = ref([
    {id: 'city_01', name: '서울', temp: 28, status: '맑음'},
    {id: 'city_02', name: '수원', temp: 24, status: '비'},
    {id: 'city_03', name: '부산', temp: 26, status: '구름'},
    {id: 'city_04', name: '인천', temp: 25, status: '맑음'},
])
const searchQuery = ref('')
const statusMessage = ref('카드를 클릭하거나 검색해 보세요.')
const selectedCityInfo = ref('')
//const myWeatherData = ref([])


const selectCity = (name) => {
    statusMessage.value = `${name}이 선택되었습니다.`
    selectedCityInfo.value = name;
    
}
watch(selectedCityInfo, () => {
    console.log(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${statusMessage.value}"`)
})
watchEffect(() => {
    console.log(`[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`)
})
const showDetail = (cityName, status) => {
    window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
const filteredWeatherList = computed(() => {
    return weatherList.value.filter(p => p.name.includes(searchQuery.value))
})
/*
const fetchWeather = async () => {
    for(let key in cities) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cities[key]}&units=metric&lang=kr&appid=`+import.meta.env.VITE_API_KEY
        try {
            const response = await axios.get(url)
            //weatherLists.value = response.data
            //weatherLists.value.push(response.data)
            myWeatherData.value.push({
                id: response.id,
                name: response.name,
                description: response.weather[0]?.description,
                temp: response.main?.temp
            })
        } catch (error) {
            console.error('API 호출 실패', error)
        }
    }
}

onMounted(() => {
    fetchWeather()
})*/

</script>

<template>
    <div class="title">
        <h1>🌤️ 과제 1: 날씨 (Mockup)</h1>
    </div>
    <div class="contents">
        <p class="textRegion" id="citySearch">
            <h3>🔍 도시 검색</h3>
            <input type="text" :value="searchQuery" @input="(e) => (searchQuery=e.target.value)" placeholder=" 검색할 도시 이름 입력" style="width:500px; height:30px"/>
            <p>검색 중인 도시: {{ searchQuery }}</p>
            
        </p>

        <p class="textRegion" id="weatherByCity">
            <h3>🏙️ 지역별 날씨 현황</h3>
            <div v-if="filteredWeatherList.length==0">
                검색어와 일치하는 도시가 없습니다.
            </div>
            <div v-else class="weatherCard" v-for="(item, index) in filteredWeatherList" :key="index" @click="selectCity(item.name)">
                <div class="weatherCardHeader">
                    <p>{{item.name}} ({{ item.status }})</p>
                    <button type="button" @click.stop="showDetail(item.name, item.status)">상세보기</button>
                </div>
                현재 기온: {{ item.temp }}°C
                <br />
                <label class="tempSticker" v-if="item.temp>=25" style="background-color: #fe6161;">🔥 더움 (25도 이상)</label>
                <label class="tempSticker" v-else style="background-color: #94d2fd;">❄️ 선선함 (25도 미만)</label>
                
            </div>
        </p>

        <p class="statusRegion" id="statusBar">
            {{ statusMessage }}
        </p>
        
    </div>
</template>

<style scoped>
.weatherCard {
    border: 1px solid #d7d7d7;
    border-radius: 8px;
    margin: 0 0 15px 0;
    padding: 10px;
    background-color: white;
}
.weatherCardHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}
.weatherCard button {
    padding: 4px 8px
}
.textRegion {
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    margin: 20px 0 20px 0;
    padding: 20px;
    background-color: #fbfbfb;
}
label.tempSticker {
    color: white;
    font-size: 85%;
    padding: 5px;
    border-radius: 5px;
}
.statusRegion {
    border-radius: 8px;
    background-color: #e3ffe3;
    text-align: center;
    padding: 10px;
    color: #20902b;
    font-weight: bold;
}
#statusBar{

}
</style>
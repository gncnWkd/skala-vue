<script setup>
import {ref} from 'vue'
const weatherList = ref([
    {id: 'city_01', name: '서울', temp: 28, status: '맑음'},
    {id: 'city_02', name: '수원', temp: 24, status: '비'},
    {id: 'city_03', name: '부산', temp: 26, status: '구름'},
    {id: 'city_04', name: '인천', temp: 25, status: '맑음'},
])
const weatherSearchText = ref('')
</script>

<template>
    <div class="title">
        <h1>🌤️ 과제 1: 날씨 (Mockup)</h1>
    </div>
    <div class="contents">
        <p class="textRegion" id="citySearch">
            <h3>🔍 도시 검색</h3>
            <input type="text" :value="weatherSearchText" @input="(e) => (weatherSearchText=e.target.value)" placeholder="검색할 도시 이름 입력" />
            <p>검색 중인 도시:{{ weatherSearchText }}</p>
        </p>

        <p class="textRegion" id="weatherByCity">
            <h3>🏙️ 지역별 날씨 현황</h3>
            <div class="weatherCard" v-for="(item, index) in weatherList" :key="index">
                {{item.name}} ({{ item.status }})
                <br />
                현재 기온: {{ item.temp }}°C
                <br />
                <label class="tempSticker" v-if="item.temp>=25" style="background-color: #fe6161;">🔥 더움 (25도 이상)</label>
                <label class="tempSticker" v-else style="background-color: #94d2fd;">❄️ 선선함 (25도 미만)</label>
                <button>상세보기</button>
            </div>
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
    display: grid;
    grid-template-columns: 8fr 2fr;
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
</style>
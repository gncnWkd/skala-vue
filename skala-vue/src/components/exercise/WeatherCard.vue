<script setup>
    import {ref} from 'vue'

    defineProps({
        weatherList: Object,
        statusMessage: String
    })
    const emit = defineEmits(['select-city', 'show-detail'])
    const selectedCity = ref('')
    const sendSelectedCity = (cityName) => {
        selectedCity.value = cityName
        emit('select-city', selectedCity.value)
    }
    const sendShowDetail = (cityName, cityStatus) => {
        emit('show-detail', cityName, cityStatus)
    }

</script>

<template>
    <h3>🏙️ 지역별 날씨 현황</h3>
        <div v-if="weatherList.length==0">
            검색어와 일치하는 도시가 없습니다.
        </div>
        <div v-else class="weatherCard" v-for="(item, index) in weatherList" :key="index" @click="sendSelectedCity(item.name)">
            <div class="weatherCardHeader">
                <p>{{item.name}} ({{ item.status }})</p>
                <button type="button" @click.stop="sendShowDetail(item.name, item.status)">상세보기</button>
            </div>
            현재 기온: {{ item.temp }}°C
            <br />
            <label class="tempSticker" v-if="item.temp>=25" style="background-color: #fe6161;">🔥 더움</label>
            <label class="tempSticker" v-else style="background-color: #94d2fd;">❄️ 선선함</label>
        </div>
        <p class="statusRegion" id="statusBar">
            {{ statusMessage }}
        </p>
</template>

<style scoped>
    .weatherCard {
        border: 1px solid #d7d7d7;
        border-radius: 8px;
        margin: 4px 0 15px 0;
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
    .statusRegion {
        border-radius: 8px;
        background-color: #e3ffe3;
        text-align: center;
        padding: 10px;
        color: #20902b;
        font-weight: bold;
    }
    label.tempSticker {
        color: white;
        font-size: 85%;
        padding: 5px;
        border-radius: 5px;
    }
</style>
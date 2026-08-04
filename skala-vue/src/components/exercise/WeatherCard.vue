<script setup>
    import {ref, computed} from 'vue'
    import { useConfigStore } from '@/stores/configStore'

    const props = defineProps({
        cityItem: Object
    })
    const configStore = useConfigStore()
    const emit = defineEmits(['select-city', 'show-detail'])
    const selectedCity = ref('')
    const sendSelectedCity = (cityName) => {
        selectedCity.value = cityName
        emit('select-city', selectedCity.value)
    }
    const sendShowDetail = (cityId) => {
        emit('show-detail', cityId)
    }
    const displayTemp = computed(() => {
        const rawTemp = props.cityItem.temp
        if (configStore.unit === '화씨') {
            return String(Math.round((rawTemp * 9) / 5 + 32))+'°F'
        }
        return String(rawTemp)+'°C'
    })
</script>

<template>
    
        <div v-if="cityItem==null">
            검색어와 일치하는 도시가 없습니다.
        </div>
        <div v-else class="weatherCard" @click="sendSelectedCity(cityItem.name)">
            <div class="weatherCardHeader">
                <p>{{cityItem.name}} ({{ cityItem.status }})</p>
                <button type="button" @click.stop="sendShowDetail(cityItem.id)">상세보기</button>
            </div>
            현재 기온: {{ displayTemp }}
            <br />
            <label class="tempSticker" v-if="cityItem.temp>=25" style="background-color: #fe6161;">🔥 더움</label>
            <label class="tempSticker" v-else style="background-color: #94d2fd;">❄️ 선선함</label>
        </div>
        
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
    label.tempSticker {
        color: white;
        font-size: 85%;
        padding: 5px;
        border-radius: 5px;
    }
</style>
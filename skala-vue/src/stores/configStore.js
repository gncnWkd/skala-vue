import { defineStore } from "pinia"
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
    const unit = ref('섭씨')
    const unitSymbol = computed(() => {
        switch (unit.value) {
            case '섭씨': return '°C'
            case '화씨': return '°F'
        }
    })
    function toggleUnit() {
        unit.value = unit.value === '섭씨' ? '화씨' : '섭씨'
    }

    return {unit, unitSymbol, toggleUnit}
})
import { defineStore } from "pinia"
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
    const unit = ref('섭씨')
    const isDarkMode = ref(false)
    const unitSymbol = computed(() => {
        switch (unit.value) {
            case '섭씨': return '°C'
            case '화씨': return '°F'
        }
    })
    function toggleUnit() {
        unit.value = unit.value === '섭씨' ? '화씨' : '섭씨'
    }

    function applyTheme() {
        document.documentElement.classList.toggle('dark', isDarkMode.value)
        localStorage.setItem('weather-dashboard-theme', isDarkMode.value ? 'dark' : 'light')
    }

    function initializeTheme() {
        const savedTheme = localStorage.getItem('weather-dashboard-theme')
        isDarkMode.value = savedTheme
            ? savedTheme === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches
        document.documentElement.classList.toggle('dark', isDarkMode.value)
    }

    function toggleDarkMode() {
        isDarkMode.value = !isDarkMode.value
        applyTheme()
    }

    return { unit, unitSymbol, isDarkMode, toggleUnit, initializeTheme, toggleDarkMode }
})

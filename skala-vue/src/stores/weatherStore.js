import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

const cities = [
  { id: 'city_01', query: 'seoul', name: '서울' },
  { id: 'city_02', query: 'suwon', name: '수원' },
  { id: 'city_03', query: 'busan', name: '부산' },
  { id: 'city_04', query: 'incheon', name: '인천' },
  { id: 'city_05', query: 'seongnam', name: '성남' },
  { id: 'city_06', query: 'jeonju', name: '전주' },
]

const FAVORITES_STORAGE_KEY = 'weather-favorite-city-ids'

const loadFavoriteCityIds = () => {
  try {
    const savedIds = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]')
    return Array.isArray(savedIds)
      ? savedIds.filter((id) => cities.some((city) => city.id === id))
      : []
  } catch {
    return []
  }
}

const toWeatherData = (city, data) => ({
  id: city.id,
  name: city.name,
  temp: data.main.temp,
  temp_feels: data.main.feels_like,
  status: data.weather[0].description,
  humidity: data.main.humidity,
  wind: data.wind.speed,
})

export const useWeatherStore = defineStore('weather', () => {
  const weatherData = ref([])
  const cityDetail = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const favoriteCityIds = ref(loadFavoriteCityIds())
  const favoriteWeatherData = computed(() =>
    favoriteCityIds.value
      .map((cityId) => weatherData.value.find((city) => city.id === cityId))
      .filter(Boolean),
  )

  function isFavorite(cityId) {
    return favoriteCityIds.value.includes(cityId)
  }

  function toggleFavorite(cityId) {
    if (!cities.some((city) => city.id === cityId)) return

    favoriteCityIds.value = isFavorite(cityId)
      ? favoriteCityIds.value.filter((id) => id !== cityId)
      : [...favoriteCityIds.value, cityId]
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteCityIds.value))
  }

  const requestWeather = (query) =>
    axios.get(API_URL, {
      params: {
        q: query,
        units: 'metric',
        lang: 'kr',
        appid: import.meta.env.VITE_API_KEY,
      },
    })

  async function fetchWeatherList() {
    isLoading.value = true
    error.value = null

    try {
      const responses = await Promise.all(cities.map((city) => requestWeather(city.query)))
      weatherData.value = cities.map((city, index) => toWeatherData(city, responses[index].data))
      console.log('전체 날씨 API 연결')
    } catch (requestError) {
      error.value = requestError
      console.error('날씨 목록을 불러오는 중 에러가 발생했습니다:', requestError)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchWeatherDetail(cityId) {
    const city = cities.find((item) => item.id === cityId)

    if (!city) {
      cityDetail.value = null
      error.value = new Error('존재하지 않는 도시입니다.')
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await requestWeather(city.query)
      cityDetail.value = toWeatherData(city, response.data)
      console.log('상세 날씨 API 연결')
    } catch (requestError) {
      cityDetail.value = null
      error.value = requestError
      console.error('날씨 상세 정보를 불러오는 중 에러가 발생했습니다:', requestError)
    } finally {
      isLoading.value = false
    }
  }

  return {
    weatherData,
    cityDetail,
    isLoading,
    error,
    favoriteCityIds,
    favoriteWeatherData,
    isFavorite,
    toggleFavorite,
    fetchWeatherList,
    fetchWeatherDetail,
  }
})

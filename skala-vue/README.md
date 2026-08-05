
# SKALA-VUE

## Vue 3와 Vue Router를 기반으로 만든 기상 관측 대시보드입니다.

#### 실행 방법
- npm run dev (개발 환경 실행)
- npm run build (빌드)
---
#### 프로젝트 구조
  src/views  
  ├── FavoriteWeatherView.vue -> 즐겨찾기 뷰  
  ├── NotFoundView.vue -> page not found 뷰  
  ├── WeatherAboutView.vue -> 서비스 소개 뷰  
  ├── WeatherDetailView.vue -> 날씨 상세 선택 뷰  
  └── WeatherHomeView.vue -> 홈페이지 뷰   

  src/components/exercise  
  ├── BaseDashboardCard.vue -> 대쉬보드 컴포넌트  
  ├── DarkModeToggler.vue -> 다크모드 라이트모드 전환 토글러  
  ├── SearchBar.vue -> 검색바 컴포넌트  
  ├── UnitToggler.vue -> 단위변경 토글러  
  ├── WeatherCard.vue -> 날씨 카드 컴포넌트  
  ├── WeatherMockup.vue -> 과제 진행 중 임시 파일  
  └── WeatherParent.vue -> 과제 진행 중 임시 파일
---
#### 추가 진행 사항
1. configStore.js에 다크모드-라이트모드 상태 저장용 반응형 변수와 변경하는 함수를 추가하여 프로젝트 전역에서 해당 변수에 접근할 수 있도록 하였습니다. DarkModeToggler에서 useConfigStore()를 이용해 반응형 변수 isDarkMode를 불러와 토글 및 상태를 볼 수 있습니다.
2. 날씨 정보를 OpenWeatherMap API를 이용해 불러왔고, 해당 정보는 weatherStore.js에 저장하여 프로젝트 전역에서 날씨 정보에 접근할 수 있도록 하였습니다.
3. 또한 weatherStore에 즐겨찾기 등록 여부를 반응형 변수로 저장하여 FavoriteWeatherView에서 접근할 수 있습니다.

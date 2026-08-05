
# SKALA-VUE

## Vue 3와 Vue Router를 기반으로 만든 기상 관측 대시보드입니다.
https://skala-vue-hoochoo.vercel.app/ (vercel 배포)

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

#### 세부 진행 사항 설명
1. configStore.js에 다크모드-라이트모드 상태 저장용 반응형 변수와 변경하는 함수를 추가하여 프로젝트 전역에서 해당 변수에 접근할 수 있도록 하였습니다. DarkModeToggler에서 useConfigStore()를 이용해 반응형 변수 isDarkMode를 불러와 토글 및 상태를 볼 수 있습니다.
2. 날씨 정보를 OpenWeatherMap API를 이용해 불러왔고, 해당 정보는 weatherStore.js에 저장하여 프로젝트 전역에서 날씨 정보에 접근할 수 있도록 하였습니다.
3. 또한 weatherStore에 즐겨찾기 등록 여부를 반응형 변수로 저장하여 FavoriteWeatherView에서 접근할 수 있습니다.
4. 즐겨찾기 로직은 다음과 같이 동작합니다.
   1. WeatherCard는 WeatherHomeView와 FavoriteWeatherView의 자식입니다.
   2. WeatherCard의 별을 클릭하면, 부모에게 toggle-favorite 이벤트를 도시의 id와 함께 emit()으로 전달합니다.
   3. 부모는 weatherStore의 toggleFavorite함수를 실행시키고, 이에 따라 weatherStore의 반응형 변수 favoriteCityIds 리스트가 변경됩니다.
   4. 이미 즐겨찾기에 등록되었던 도시 id는 사라지고, 즐겨찾기가 아니었던 도시 id는 리스트에 새로 추가됩니다.
   5. FavoriteWeatherView는 weatherStore에서 반응형변수 favoriteWeatherData와 favoriteCityIds를 가져와 해당 정보를 토대로 즐겨찾기 도시 카드만 표시합니다.
   6. WeatherHomeView 역시 weatherStore에서 반응형변수를 가져와 해당 정보를 토대로 검색어로 필터링된 도시 카드를 표시합니다.
5. Element Plus Library를 이용하여 여러 UI를 적용하였습니다. `<`el-card`>`를 이용해 weather-card의 UI를, `<`el-button`>`을 이용해 즐겨찾기 버튼과 토글 버튼 등 다양한 버튼의 UI를, `<`el-alert`>`,`<`el-empty`>`를 이용해 전달받은 API 데이터에 대한 feedback이나 결과 없음 UI등을 적용하였습니다. 이외에도 `<`el-tag`>`, `<`el-input`>` 등 다양한 Element Plus Library UI를 사용하였습니다.

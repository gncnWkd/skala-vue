# skala-vue

Vue 3와 Vite로 구현한 날씨 대시보드 프로젝트입니다. OpenWeather API에서 주요 도시의 현재 날씨를 조회하고, 도시 검색·상세 조회·즐겨찾기·온도 단위 전환·다크 모드를 제공합니다.

화면에 표시되는 서비스는 **날씨바바(Weather dashboard)**이며, Vue 핵심 문법과 컴포넌트 통신을 학습한 코드도 `src/components/practices`와 `src/components/exercise` 아래에 함께 정리되어 있습니다.

## 주요 기능

- 서울, 수원, 부산, 인천, 성남, 전주의 현재 날씨 조회
- 도시 이름 검색 및 검색 결과 개수 표시
- 도시별 상세 날씨 조회: 기온, 습도, 풍속, 기상 상태
- 즐겨찾기 추가·해제 및 전체 해제
- 섭씨(°C)·화씨(°F) 표시 전환
- 라이트·다크 테마 전환 및 브라우저 테마 설정 초기 반영
- 로딩·오류·검색 결과 없음 상태 표시
- Windy 기온 지도 임베드
- 반응형 레이아웃 및 존재하지 않는 경로에 대한 404 화면

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| UI | Vue `^3.5.40`, Single File Component, Composition API |
| 개발 서버·번들러 | Vite `^8.1.5` |
| 상태 관리 | Pinia `^4.0.2` |
| 라우팅 | Vue Router `^5.2.0` |
| HTTP 통신 | Axios `^1.19.0` |
| UI 컴포넌트 | Element Plus `^2.14.3` |
| 코드 품질 | ESLint, Oxlint, Prettier |

`package.json`의 Node 엔진 조건은 `^22.18.0 || >=24.12.0`입니다. npm과 함께 Node.js 22.18 이상 또는 24.12 이상 환경을 권장합니다.

## 개발 환경 설정

### 설치

```sh
npm install
```

### 환경변수

프로젝트 루트에 `.env` 파일을 만들고 OpenWeather API 키를 등록합니다.

```env
VITE_API_KEY=발급받은_OpenWeather_API_KEY
```

코드에서는 `import.meta.env.VITE_API_KEY`로 읽습니다. Vite에서 브라우저에 노출되는 환경변수는 `VITE_` 접두사가 필요하며, `.env` 파일은 Git에 포함되지 않도록 `.gitignore`에 등록되어 있습니다.

현재 API 요청이 브라우저에서 직접 이루어지므로 키가 클라이언트 번들에 포함될 수 있습니다. 실제 서비스 배포 시에는 OpenWeather 키의 사용량·도메인 제한을 설정하거나 별도의 백엔드 프록시를 두는 방식을 고려해야 합니다.

### 실행 명령어

```sh
# 개발 서버 실행 및 HMR
npm run dev

# 프로덕션 빌드
npm run build

# Oxlint와 ESLint 실행 및 자동 수정
npm run lint

기본 개발 서버 주소는 Vite의 기본값인 `http://localhost:5173`입니다.

## 프로젝트 구조

```text
skala-vue/
├─ public/                         # 정적 파일
├─ src/
│  ├─ assets/
│  │  ├─ base.css                  # 전역 변수, Element Plus 테마 변수, 다크 모드 변수
│  │  ├─ main.css                  # base.css import 및 앱 컨테이너 레이아웃
│  │  └─ 이미지·아이콘 리소스
│  ├─ components/
│  │  ├─ exercise/                 # 날씨 대시보드 컴포넌트와 단계별 실습 코드
│  │  │  ├─ BaseDashboardCard.vue
│  │  │  ├─ DarkModeToggler.vue
│  │  │  ├─ SearchBar.vue
│  │  │  ├─ UnitToggler.vue
│  │  │  ├─ WeatherCard.vue
│  │  │  ├─ WeatherMockup.vue
│  │  │  └─ WeatherParent.vue
│  │  ├─ practices/basic/
│  │  │  └─ SampleOne.vue           # Vue 디렉티브·반응성·생명주기 학습 예제
│  │  └─ icons/                    # Vue 기본 템플릿에서 제공된 아이콘 컴포넌트
│  ├─ router/
│  │  └─ index.js                  # Vue Router 설정
│  ├─ stores/
│  │  ├─ configStore.js             # 단위·테마 전역 상태
│  │  ├─ weatherStore.js            # 날씨 API·즐겨찾기 전역 상태
│  │  └─ counter.js                 # Pinia 기본 예제
│  ├─ views/
│  │  ├─ WeatherHomeView.vue       # 메인 대시보드
│  │  ├─ WeatherDetailView.vue      # 도시 상세 화면
│  │  ├─ FavoriteWeatherView.vue    # 즐겨찾기 화면
│  │  ├─ WeatherAboutView.vue       # 서비스 소개 화면
│  │  ├─ NotFoundView.vue           # 404 화면
│  │  └─ HomeView.vue, AboutView.vue # Vue 초기 템플릿 예제
│  ├─ App.vue                       # 공통 헤더·메뉴·라우터 화면 영역
│  └─ main.js                       # 앱 생성 및 플러그인 등록 진입점
├─ index.html
├─ vite.config.js                  
├─ eslint.config.js
├─ jsconfig.json                    
└─ vercel.json                      # SPA 새로고침을 위한 Vercel rewrite
```

`exercise`와 `practices` 아래의 일부 파일은 학습·실습용으로 보존되어 있습니다. 현재 서비스의 실제 라우트에서 사용하는 핵심 흐름은 `App.vue` → `views` → `components/exercise` → `stores`입니다.

## 화면 및 컴포넌트 배치 구조

```text
App.vue
├─ RouterLink                         # 브랜드 홈 이동
├─ el-menu / el-menu-item             # 상단 메뉴
├─ UnitToggler                        # 온도 단위 전환
├─ DarkModeToggler                    # 테마 전환
└─ RouterView
   └─ KeepAlive(WeatherHomeView)
      └─ WeatherHomeView
         ├─ BaseDashboardCard
         │  └─ SearchBar
         ├─ BaseDashboardCard
         │  └─ Windy iframe 지도
         └─ BaseDashboardCard
            └─ WeatherCard × 검색 결과 수
```

페이지 단위 UI는 `views`에 배치하고, 여러 화면에서 재사용되는 단위 UI는 `components/exercise`에 배치했습니다. 날씨 조회와 즐겨찾기처럼 여러 화면이 공유하는 데이터는 컴포넌트 내부가 아니라 Pinia store에서 관리합니다.

## Vue 핵심 문법 사용 현황

### `<script setup>`과 Composition API

모든 주요 SFC는 `<script setup>`을 사용합니다. 별도의 `return` 없이 스크립트의 변수와 함수를 템플릿에서 사용할 수 있습니다.

```vue
<script setup>
import { computed, ref } from 'vue'

const searchQuery = ref('')
const resultMessage = computed(() => `${searchQuery.value} 검색 결과`)
</script>
```

### 반응성: `ref`, `reactive`, `computed`

- `ref`: 검색어, 로딩 여부, API 결과처럼 변경되는 단일 상태에 사용합니다.
- `reactive`: `SampleOne.vue`에서 객체·배열 반응성 실습에 사용합니다.
- `computed`: 검색 결과 필터링, 즐겨찾기 목록, 온도 표시처럼 기존 상태에서 계산되는 값을 만들 때 사용합니다.
- `<template>`에서는 ref의 `.value`를 자동으로 언래핑하지만, `<script setup>`에서는 `.value`가 필요합니다.

실제 메인 화면에서는 API 결과와 검색어를 조합해 목록을 계산합니다.

```js
const filteredWeatherList = computed(() => weatherData.value
  .filter((item) => item.name.includes(searchQuery.value.trim()))
  .map((item) => ({
    ...item,
    isFavorite: favoriteCityIds.value.includes(item.id),
  })))
```

### 디렉티브

`SampleOne.vue`에서 기본 문법을 독립적으로 실습하고, 실제 화면에서도 일부를 사용합니다.

| 문법 | 프로젝트 사용 예 |
| --- | --- |
| `{{ }}` | 도시명, 기온, 상태 메시지 출력 |
| `v-if / v-else-if / v-else` | 로딩·오류·빈 결과·정상 목록 상태 분기 |
| `v-for`와 `:key` | 날씨 카드 목록 렌더링 |
| `v-model` | `SearchBar`의 Element Plus 입력값, 실습 폼 입력값 연결 |
| `:prop` 또는 `v-bind` | `:city-item`, `:loading`, `:class`, `:aria-label` 등 |
| `@event` 또는 `v-on` | 클릭·키보드·입력 이벤트 처리 |
| `@click.stop`, `@click.prevent` | 카드 클릭 전파 중지, 링크 기본 동작 중지 실습 |
| `v-html`, `v-text` | `SampleOne.vue`의 출력 차이 및 XSS 학습 |

`v-html`은 문자열을 HTML로 해석하므로 사용자 입력이나 외부 응답을 검증 없이 넣으면 XSS 위험이 있습니다. 실제 서비스 화면에서는 일반 보간법(`{{ }}`)을 우선 사용합니다.

### 생명주기와 감시

- `WeatherHomeView.vue`: `onMounted` 시 전체 도시 날씨를 조회합니다.
- `FavoriteWeatherView.vue`: 데이터가 아직 없을 때만 날씨 목록을 조회합니다.
- `WeatherDetailView.vue`: `watch`로 `route.params.cityId` 변화를 감시하고, `{ immediate: true }`로 최초 진입 시에도 조회합니다.
- `SampleOne.vue`: `onMounted`, `onUpdated`, `onUnmounted`, `watch`, `watchEffect`를 생명주기 학습 목적으로 사용합니다.

### 슬롯과 동적 컴포넌트

- `BaseDashboardCard.vue`는 `<slot />`을 제공해 카드 내부 콘텐츠를 부모가 주입합니다.
- `SearchBar.vue`는 Element Plus 입력 컴포넌트의 `prefix`, `suffix` 슬롯을 사용합니다.
- `NotFoundView.vue`는 `el-result`의 `extra` 슬롯을 사용합니다.
- `App.vue`는 `RouterView`의 슬롯으로 현재 라우트 컴포넌트를 받고 `<component :is="Component" />`로 렌더링합니다.
- `KeepAlive include="WeatherHomeView"`로 메인 화면 컴포넌트 상태를 보존하도록 구성했습니다.

## Props와 Emits

컴포넌트는 props로 데이터를 받고, emits로 부모에게 사용자 동작을 알립니다. 자식이 부모의 상태를 직접 변경하지 않고 이벤트를 발생시키는 단방향 데이터 흐름을 사용합니다.

| 컴포넌트 | Props | Emits | 역할 |
| --- | --- | --- | --- |
| `BaseDashboardCard` | 없음 | 없음 | `slot`으로 받은 콘텐츠를 `el-card`로 감쌈 |
| `SearchBar` | `currentQuery: String`, 기본값 `''` | `update-query(value)` | 입력값을 부모 검색 상태로 전달 |
| `WeatherCard` | `cityItem: Object`, 필수 | `select-city(name)`, `show-detail(cityId)`, `toggle-favorite(cityId)` | 카드 선택·상세 이동·즐겨찾기 동작 전달 |
| `UnitToggler` | 없음 | 없음 | `configStore`를 직접 사용해 단위 변경 |
| `DarkModeToggler` | 없음 | 없음 | `configStore`를 직접 사용해 테마 변경 |

### 검색어 전달 흐름

```text
WeatherHomeView의 searchQuery
        ↓ :current-query
SearchBar의 props.currentQuery
        ↓ @update:model-value
SearchBar의 emit('update-query', value)
        ↓ @update-query
WeatherHomeView의 searchQuery 갱신
```

`SearchBar`는 부모 props를 직접 수정하지 않고 내부 `searchQuery` ref를 사용합니다. 부모의 값이 외부에서 바뀌는 경우에는 `watch`로 내부 입력값을 동기화합니다.

### 날씨 카드 이벤트 흐름

`WeatherHomeView`와 `FavoriteWeatherView`가 `WeatherCard`에 `cityItem`을 전달합니다. `WeatherCard`는 카드 클릭 시 `select-city`, 상세 버튼 클릭 시 `show-detail`, 별 버튼 클릭 시 `toggle-favorite` 이벤트를 발생시킵니다. 부모 view는 각각 상태 메시지 변경, `router.push`, `weatherStore.toggleFavorite`를 실행합니다.

## Pinia Store

`main.js`에서 Pinia 인스턴스를 만들고 앱에 등록합니다.

```js
const pinia = createPinia()
app.use(pinia)
```

### `configStore.js`

`defineStore('config', () => {})` 형태의 Setup Store입니다.

- 상태: `unit`, `isDarkMode`
- 계산값: `unitSymbol` (`°C` 또는 `°F`)
- 액션: `toggleUnit`, `toggleDarkMode`, `initializeTheme`
- 테마 설정: `document.documentElement`에 `dark` 클래스 추가·제거
- 저장 키: `weather-dashboard-theme`
- 초기화: 저장된 테마가 없으면 `prefers-color-scheme: dark`를 확인

앱 시작 시 `useConfigStore(pinia).initializeTheme()`을 호출하므로 마운트 전에 초기 테마가 반영됩니다.

### `weatherStore.js`

날씨 API 상태와 즐겨찾기를 한 곳에서 관리합니다.

- 상태: `weatherData`, `cityDetail`, `isLoading`, `error`, `favoriteCityIds`
- 계산값: `favoriteWeatherData`
- 함수: `isFavorite`, `toggleFavorite`
- 비동기 액션: `fetchWeatherList`, `fetchWeatherDetail`
- 저장 키: `weather-favorite-city-ids`

전체 날씨 목록은 등록된 도시를 대상으로 `Promise.all`을 사용해 병렬 요청합니다. OpenWeather 응답은 `toWeatherData` 함수로 화면에서 사용할 다음 형태로 변환합니다.

```js
{
  id,
  name,
  temp,
  temp_feels,
  status,
  humidity,
  wind
}
```

View에서 store의 state·computed를 구조 분해할 때는 `storeToRefs`를 사용해 반응성을 유지합니다.

```js
const { weatherData, isLoading, error } = storeToRefs(weatherStore)
```

`counter.js`는 Pinia의 `count`, `doubleCount`, `increment` 패턴을 보여주는 기본 예제이며 현재 날씨 화면에서는 사용하지 않습니다.

## Router

`src/router/index.js`에서 `createRouter`와 `createWebHistory`를 사용합니다. `import.meta.env.BASE_URL`을 history의 기준 경로로 사용하며, 각 view는 동적 import로 지연 로딩됩니다.

| 경로 | 이름 | 화면 |
| --- | --- | --- |
| `/` | `home` | `WeatherHomeView.vue` — 전체 날씨 대시보드 |
| `/favorites` | `favorites` | `FavoriteWeatherView.vue` — 즐겨찾기 |
| `/about` | `about` | `WeatherAboutView.vue` — 서비스 소개 |
| `/weather/:cityId` | `weatherDetail` | `WeatherDetailView.vue` — 도시 상세 |
| `/:pathMatch(.*)` | `NotFound` | `NotFoundView.vue` — 404 |

`App.vue`의 `RouterLink`와 Element Plus `el-menu`가 상단 내비게이션을 담당합니다. 코드에서 화면을 이동해야 할 때는 `useRouter()`의 `router.push()`를 사용합니다.

배포 시 정적 호스팅 서버가 `/weather/city_01` 같은 새로고침 요청을 `index.html`로 전달해야 합니다. `vercel.json`은 모든 경로를 `/index.html`로 rewrite하도록 설정되어 있습니다.

## API 연동

날씨 API 호출은 별도 서비스 파일이 아니라 `src/stores/weatherStore.js`에서 Axios로 처리합니다.

```text
GET https://api.openweathermap.org/data/2.5/weather
  q     = 도시 검색어
  units = metric
  lang  = kr
  appid = import.meta.env.VITE_API_KEY
```

### 목록 조회

`fetchWeatherList()`가 6개 도시의 API를 병렬 호출하고, 성공하면 `weatherData`를 갱신합니다. 요청 중에는 `isLoading`이 `true`가 되고, 실패하면 `error`에 예외를 저장합니다.

### 상세 조회

`/weather/:cityId` 진입 시 route parameter를 기준으로 등록된 도시를 찾고, 해당 도시만 다시 요청해 `cityDetail`에 저장합니다. 등록되지 않은 ID는 오류 상태로 처리합니다.

### 표시 단위

API는 항상 섭씨 기준(`units=metric`)으로 요청합니다. `WeatherCard`와 `WeatherDetailView`에서 화면 표시 시에만 화씨 변환을 수행하므로 API 재요청 없이 단위를 바꿀 수 있습니다.

## Element Plus 사용

`main.js`에서 Element Plus와 전역 CSS를 등록합니다.

```js
app.use(ElementPlus)
import 'element-plus/dist/index.css'
```

프로젝트에서 사용하는 대표 컴포넌트는 다음과 같습니다.

| 컴포넌트 | 사용 위치·목적 |
| --- | --- |
| `el-menu`, `el-menu-item` | `App.vue` 상단 라우팅 메뉴 |
| `el-button` | 새로고침, 상세 이동, 테마·단위 전환, 뒤로가기 |
| `el-input` | `SearchBar.vue` 도시 검색 |
| `el-card` | 대시보드 카드, 날씨 카드, 소개 화면 |
| `el-skeleton` | API 로딩 상태 |
| `el-alert` | API 오류 및 상태 메시지 |
| `el-empty` | 검색 결과·즐겨찾기 없음 상태 |
| `el-tag` | 날씨 상태와 검색어 표시 |
| `el-result` | 404 및 상세 조회 오류 화면 |
| `el-descriptions` | 상세 날씨 지표 표시 |
| `el-row`, `el-col` | 소개 화면의 반응형 기능 목록 |

Element Plus 컴포넌트의 내부 DOM을 조정해야 하는 스타일은 `<style scoped>` 안에서 `:deep()`을 사용합니다. 전역 색상과 다크 모드 색상은 `src/assets/base.css`의 CSS 변수로 관리합니다.

## 상태 처리 및 사용자 흐름

```text
페이지 진입
  └─ WeatherHomeView.onMounted()
      └─ weatherStore.fetchWeatherList()
          ├─ loading → el-skeleton
          ├─ error   → el-alert
          └─ success → computed 필터 → WeatherCard 목록

WeatherCard 상세 보기
  └─ emit('show-detail', cityId)
      └─ router.push('/weather/' + cityId)
          └─ route.params.cityId 감시
              └─ fetchWeatherDetail(cityId)
```

즐겨찾기 ID는 `localStorage`에 저장되며, 날씨 데이터는 API에서 다시 조회합니다. 따라서 브라우저 저장소를 지우면 즐겨찾기도 초기화됩니다.

## 스타일링 규칙

- 공통 색상·간격·Element Plus 테마 값은 `src/assets/base.css`에서 관리합니다.
- 페이지와 컴포넌트별 스타일은 각 `.vue` 파일의 `<style scoped>`에 작성합니다.
- `:root.dark` CSS 변수로 다크 모드 색상을 교체합니다.
- `App.vue`, 날씨 목록, 즐겨찾기, 상세 화면에 모바일 대응 미디어 쿼리가 포함되어 있습니다.
- `vite.config.js`의 `@` 별칭으로 `src`를 절대 경로처럼 참조할 수 있습니다.

```js
import { useWeatherStore } from '@/stores/weatherStore'
```

## 참고: 학습·실습 코드

- `src/components/practices/basic/SampleOne.vue`: 보간법, `v-html`, `v-text`, `v-bind`, 클래스·스타일 바인딩, 이벤트 수식어, `v-model`, `ref`, `reactive`, `computed`, `watch`, 생명주기 실습
- `src/components/exercise/WeatherMockup.vue`: API 없이 동작하는 날씨 목업 및 기본 디렉티브 실습
- `src/components/exercise/WeatherParent.vue`: 부모-자식 컴포넌트 통신 실습

위 파일들은 현재 Router에 연결되어 있지 않습니다. 특히 `WeatherParent.vue`는 초기 컴포넌트 실습 형태를 보존한 코드이므로, 현재 운영 흐름의 `WeatherCard` props(`cityItem`)와 사용 방식이 다를 수 있습니다. 새 화면에서 재사용할 때는 현재 컴포넌트 인터페이스를 기준으로 연결해야 합니다.

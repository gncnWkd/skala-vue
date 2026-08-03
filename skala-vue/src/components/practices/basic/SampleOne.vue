<script setup>
import {ref, reactive, computed, watch, onMounted, onUpdated, onUnmounted} from 'vue'

let normalCount = 0
const vueCount = ref(0)
const rawHtmlData = '이 글자는 <span style="color:red; font-weight:bold;">빨간색 굵은 글자</span>이다.'
const inputValue = ref('')
const message = ref('')
const isWarning = ref(false)
const themeClass = ref('bg-dark')
const content = '안녕하세요! <strong>Skala-Vue</Strong> 강의입니다.'
const dynamicUrl = 'https://www.naver.com'
const logoImgSrc = 'https://vuejs.org/images/logo.png'
const isButtonDisabled = ref(true)
const count = ref(0)
const position = ref('')
const tagName = ref('')
const textColor = ref('purple')
const boxWidth = ref(150)
const text1 = ref('')
const text2 = ref('')
const comment = ref('')
const isAgreed = ref(false)
const favoriteFruits = ref([])
const gender = ref('')
const selectedCar = ref('')
const lazyText = ref('')
const age = ref('')
const userEmail = ref('')
const price = ref('')
const count2 = ref(0)
//const name = ref('홍길동')
const isActive = ref(true)
const items = ref(['사과','배'])
const user = ref({name: '이순신', age: 30,})
const userReactive = reactive({name: '이순신', age: 30,})
const items2 = reactive(['사과', '바나나'])
const count3 = ref(0)
const dummy = ref(0)
const currentCity = ref('서울')
const logMessage = ref('아직 감시 시스템이 작동하지 않았습니다.')
const count4 = ref(0)
let timerId = null


const celebrateReactive = () => {userReactive.age++}
const addItem = () => {items2.push(`과일 ${items2.length+1}`)}
const removeItem = (index) => {items2.splice(index, 1)}
const handleLink = () => {
    alert('수식어 덕분에 네이버로 이동하지 않고 함수만 실행됩니다!')
}
const handleBox = () => {
    alert('부모 박스가 클릭되었습니다!')
}
const handleChild1 = () => {
    alert('1번 자식 클릭!')
}
const handleChild2 = () => {
    alert('2번 자식(나만 켜짐) 클릭!')
}
const baseBoxStyle = ref({
    backgroundColor: '#42b883',
    height: '100px',
    transition: 'all 0.3s ease',
})
const getOnlyEvent = (e) => {
    position.value = `좌표: X=${e.clientX}, Y=${e.clientY}`
}
const getWithParam = (name, e) => {
    tagName.value = `대상: ${name} / 클릭된 태그: ${e.target.tagName}`
}
const showAlert = () => {
    alert('함수가 성공적으로 호출되었습니다.')
}
function showMessage(){
    message.value = inputValue.value
}
const increaseRef = () => {
    count2.value++
}
const changeUserName = () => {
    user.value.name = '장보고'
}
const getMethodResult = () => {
    console.log('일반 함수 실행됨!')
    return count3.value * 2
}
const doubleCount = computed(() => {
    console.log('Computed 연산 실행됨!')
    return count3.value * 2
})
watch(currentCity, (newValue, oldValue) => {
    logMessage.value = `감시자 발동! [${oldValue}]에서 [${newValue}]로 변경됨.`
    console.log(`[서버 요청 완료] 기상청 서버에서 ${newValue}의 날씨 API를 다시 조회합니다.`)
})

console.log('1. [setup] 컴포넌트가 메모리에 생성되었습니다. (DOM 접근 불가능)')
onMounted(() => {
    console.log('2. [onMounted] 화면에 완벽히 부착되었습니다! (API 호출/DOM 조작 적기)')
    timerId = setInterval(() => {
        count.value++
    }, 3000)
})
onUpdated(() => {
    console.log(`3. [onUpdated] 데이터가 변경되어 화면을 새로 그렸습니다. (현재 count: ${count4.value})`)
})
onUnmounted(() => {
    clearInterval(timerId)
    console.log('4. [onUnmounted] 컴포넌트가 소멸했습니다. 타이머 청소 완료!')
})
</script>

<template>
    <div class="practice-section">
        <h2>Hello Skala-Vue</h2>
        <h3>일반 변수 클릭: {{ normalCount }}</h3>
        <button @click="normalCount++">일반 변수 증가</button>
        <br />
        <h3>반응성 변수 클릭: {{ vueCount }}</h3>
        <button @click="vueCount++">Vue 변수 증가</button>
    </div>
    <div class="practice-section">
        <h2>v-html 디렉티브 학습</h2>
        <h3>일반 보간법 {{  }} 사용 결과:</h3>
        <p>{{ rawHtmlData }}</p>
        <br />
        <h3>v-html 디렉티브 사용 결과:</h3>
        <p v-html="rawHtmlData"></p>
    </div>
    <div class="practice-section">
        <h2>v-html XSS 학습</h2>
        <input v-model="inputValue" placeholder="내용을 입력하세요" />
        <button @click="showMessage">확인</button>
        <div v-html="message"></div>
    </div>
    <div class="practice-section">
        <h2>v-text 디렉티브 학습</h2>
        <h3>1) 일반 보간법 {{  }} 결과:</h3>
        <p>출력: {{ content }}</p>
        <br />

        <h3>2)v-text 디렉티브 결과:</h3>
        <p v-text="'출력 :'+content"></p>
        <br />

        <h3>3) v-html 결과 비교:</h3>
        <p v-html="content"></p>
    </div>
    <div class="practice-section">
        <h2>v-bind 디렉티브 기본 (축약형: 콜론)</h2>
        <h3>1) 동적 링크 연결</h3>
        <a :href="dynamicUrl">여기를 클릭하면 네이버로 이동합니다</a>
        <br />

        <h3>2) 동적 이미지 연결</h3>
        <img :src="logoImgSrc" alt="Vue 로고" style="width:100px" />
        <br />

        <h3>3) 버튼 비활성화 제어</h3>
        <p>현재 버튼 사용 불가능 상태ㅣ {{ isButtonDisabled }}</p>
        <button :disabled="isButtonDisabled">동의해야 클릭할 수 있는 버튼</button>&nbsp;
        <button @click="isButtonDisabled = !isButtonDisabled">위 버튼 잠금 해제/토글하기</button>
    </div>
    <div class="practice-section">
        <h2>v-bind 디렉티브 고급 (클래스 바인딩)</h2>
        <h3>클래스 바인딩 (객체 형식)</h3>
        <p :class="{'text-danger': isWarning}">현재 경고 상태: {{ isWarning }}</p>
        <button @click="isWarning = !isWarning">경고 상태 토글</button>
        <br />

        <h3>클래스 바인딩 (배열 형식)</h3>
        <div :class="[themeClass, isWarning ? 'border-red' : 'border-gray']">다중 클래스가 조립된 박스 구역입니다.</div>
    </div>
    <div class="practice-section">
        <h2>v-bind 디렉티브 고급 (스타일 바인딩)</h2>
        <h3>1) 인라인 스타일 변수 조작 (객체 형식)</h3>
        <p :style="{color:textColor,fontWeight: 'bold'}">이 글자의 색상은 실시간으로 바뀝니다.</p>
        <button @click="textColor = textColor==='purple' ? 'blue' : 'purple'">글자 색상 토글</button>
        <br />

        <h3>2) 다중 스타일 객체 조립 (배열 형식)</h3>
        <label>박스 가로 크기(px): </label>
        <input type="number" v-model="boxWidth" step="50" />
        <br />

        <div :style="[baseBoxStyle, {width:boxWidth+'px'}]">
            <p style="color:white; padding:10px; text-align:center">가로 크기: {{ boxWidth }}px 박스</p>
        </div>
    </div>
    <div class="practice-section">
        <h2>v-on 이벤트 핸들링 기초</h2>
        <h3>1) 인라인 연산 처리</h3>
        <p>현재 카운트: {{ count }}</p>
        <button @click="count++">1씩 증가</button>
        <br />

        <h3>2) 스크립트 함수 호출</h3>
        <button @click="showAlert">알림창 띄우기</button>
    </div>
    <div class="practice-section">
        <h2>v-on 이벤트 객체($event) 활용</h2>
        <p>좌표: {{ position }}</p>
        <p>태그: {{ tagName }}</p>
        <button @click="getOnlyEvent">클릭 좌표 알아내기</button>
        <button @click="getWithParam('회원A', $event)">회원 정보와 태그 확인</button>
    </div>
    <div class="practice-section">
        <h2>이벤트 수식어(Modifiers) 학습</h2>
        <h3>1) .prevent (기본 동작 막기)</h3>
        <a href="https://www.naver.com" @click.prevent="handleLink">네이버 링크</a>
        <br />

        <h3>2) .stop (이벤트 버블링 막기)</h3>
        <div @click="handleBox" style="padding:20px; background-color:#eee;">
            <p>부모 영역 (클릭 시 alert 발동)</p>
            <button @click="handleChild1">버블링 발생 버튼</button>
            <button @click.stop="handleChild2">버블링 차단 버튼</button>
        </div>
    </div>
    <div class="practice-section">
        <h2>v-model 양방향 데이터 바인딩</h2>
        <h3>1) v-model 축약 문법 (양방향)</h3>
        <input type="text" v-model="text1" placeholder="여기에 입력하세요" />
        <p>
            입력된 값: <strong>{{ text1 }}</strong>
        </p>
        <h3>2) v-model 내부 작동 원리 (단방향 + 이벤트)</h3>
        <input type="text" :value="text2" @input="(e)=>(text2 = e.target.value)" placeholder="원리 파악용 입력창" />
        <p>
            입력된 값: <strong>{{ text2 }}</strong>
        </p>
    </div>
    <div class="practice-section">
        <h2>모든 HTML Form 요소와 v-model 매핑</h2>
        <div>
            <h3>1) Textarea (장문 텍스트)</h3>
            <textarea v-model="comment" placeholder="의견을 남겨주세요"></textarea>
            <p>
                데이터 상태: <span>{{ comment }}</span>
            </p>
        </div>
        <div>
            <h3>2) 단일 Checkbox (동의 여부)</h3>
            <label><input type="checkbox" v-model="isAgreed" />약관에 동의합니다.</label>
            <p>
                데이터 상태: <span>{{ isAgreed }}</span>
            </p>
        </div>
        <div>
            <h3>3) 다중 Checkbox (복수 선택 -> 배열에 저장)</h3>
            <label><input type="checkbox" value="사과" v-model="favoriteFruits"/>사과</label> &nbsp;
            <label><input type="checkbox" value="바나나" v-model="favoriteFruits"/>바나나</label> &nbsp;
            <label><input type="checkbox" value="딸기" v-model="favoriteFruits"/>딸기</label>
            <p>
                데이터 상태: <span>{{ favoriteFruits }}</span>
            </p>
        </div>
        <div>
            <h3>4) Radio (단일 선택)</h3>
            <label><input type="radio" value="남성" v-model="gender"/>남성</label> &nbsp;
            <label><input type="radio" value="여성" v-model="gender"/>여성</label>
            <p>
                데이터 상태: <span>{{ gender }}</span>
            </p>
        </div>
        <div>
            <h3>5) Select (드롭다운 선택)</h3>
            <select v-model="selectedCar">
                <option value="">-- 선택하세요 --</option>
                <option value="tesla">테슬라</option>
                <option value="hyundai">현대</option>
                <option value="bmw">BMW</option>
            </select>
            <p>
                데이터 상태: <span>{{ selectedCar }}</span>
            </p>
        </div>
    </div>
    <div class="practice-section">
        <h2>v-model 수식어 (Modifiers) 활용</h2>
        <!-- 1) .lazy 수식어 실습-->
        <section style="margin-bottom: 20px">
            <h3>1) .lazy 수식어 (change 이벤트 시점 반영)</h3>
            <input type="text" v-model.lazy="lazyText" placeholder=
            "입력 후 Enter 또는 외부 클릭" />
            <p>
            실시간이 아닌 확정된 값: <strong>{{ lazyText }}</strong>
            </p>
        </section>
        <!-- 2) .number 수식어 실습-->
        <section style="margin-bottom: 20px">
            <h3>2) .number 수식어 (Number 타입 자동 형변환)</h3>
            <input type="text" v-model.number="age" placeholder=
            "나이를 입력하세요" />
            <p>
            입력된 값: <strong>{{ age }}</strong>
            </p>
            <p>
            데이터 타입: <strong>{{ typeof age }}</strong>
            </p>
        </section>
        <!-- 3) .trim 수식어 실습-->
        <section>
            <h3>3) .trim 수식어 (양끝 공백 자동 제거)</h3>
            <input type="text" v-model.trim="userEmail" placeholder=
            "앞뒤 공백을 포함해 입력해 보세요" />
            <p>
            공백 제거된 값: <strong>"{{ userEmail }}"</strong>
            </p>
            <p>
            문자열 길이: <strong>{{ userEmail.length }}</strong>
            </p>
        </section>
        <!-- 4) 수식어 체이닝 (Chaining) 실습-->
        <section>
            <h3>4) Chaining (수식어 체이닝: .trim.number)</h3>
            <input type="text" v-model.trim.number="price" placeholder=
            "공백과 숫자를 섞어 입력해 보세요" />
            <p>
            처리된 값: <strong>"{{ price }}"</strong>
            </p>
            <p>
            데이터 타입: <strong>{{ typeof price }}</strong>
            </p>
        </section>
    </div>
    <div class="practice-section">
        <h2>반응형 상태 ref() 기초</h2>
        <p>Ref 카운트: <strong>{{ count2 }}</strong></p>
        <p>이름: <input v-model="user.name" />{{ user.name }}</p>
        <p>활성 상태: {{ isActive ? '활성' : '비활성' }}</p>
        <p>과일 목록: {{ items.join(', ') }}</p>
        <p>사용자 정보: 이름 - {{ user.name }}, 나이 - {{ user.age }}</p>
        <button @click="increaseRef">Ref 변수 증가</button>
        <button @click="isActive = !isActive">토글</button>
        <button @click="items.push('귤')">과일 추가</button>
        <button @click="changeUserName">사용자 이름 변경</button>
    </div>
    <div class="practice-section">
        <h2>반응형 상태 reactive() 특징 및 주의점</h2>
        <h3>1) 객체(Object) reactive</h3>
        <p>이름: {{ userReactive.name }} / 나이: {{ userReactive.age }}세</p>
        <button @click="celebrateReactive">reactive 나이 한 살 추가</button>
        <h3>2) 배열(Array) reactive</h3>
        <ul>
            <li v-for="(item, index) in items2" :key="index">
                {{ item }}
                <button @click="removeItem(index)" style="margin-left:8px; padding:2px 6px">삭제</button>
            </li>
        </ul>
        <button @click="addItem">과일 항목 추가</button>
    </div>
    <div class="practice-section">
        <h2>computed() 캐싱 동작 비교</h2>
        <p>count: {{ count3 }} || dummy: {{ dummy }}</p>
        <button @click="count3++">count 증가 (의존성 변경)</button>
        <button @click="dummy++">dummy 증가 (무관한 변경)</button>
        <p>일반 함수 결과: {{ getMethodResult() }}</p>
        <p>Computed 결과: {{ doubleCount }}</p>
    </div>
    <div class="practice-section">
        <h2>감시자 watch()의 원리와 실무 활용</h2>
        <h3>지역 선택 제어판</h3>
        <p>현재 선택된 도시: {{ currentCity }}</p>
        <button @click="currentCity='서울'">서울 선택</button> &nbsp;
        <button @click="currentCity='수원'">수원 선택</button> &nbsp;
        <button @click="currentCity='부산'">부산 선택</button>
        <div class="monitor">
            <h3>파수꾼(watch) 모니터링 시스템</h3>
            <p>{{ logMessage }}</p>
            <small type="color:gray">(버튼을 누른 후 브라우저 콘솔창 F12를 확인해 보세요)</small>
        </div>
    </div>
    <div class="practice-section">
        <h3>라이프사이클 훅 흐름 탐색기</h3>
        <div v-if="count4 < 10" class="counter-display">
            <p>실시간 타이머 카운트: {{ count4 }}</p>
            <button @click="count4++">수동으로 숫자 올리기</button>
        </div>
    </div>
</template>

<style scoped>
.text-danger {color: red; font-weight: bold;}
.bg-dark {background-color: #333; color:white; padding:15px;}
.border-red {border: 3px solid red;}
.border-gray {border: 3px solid gray;}
</style>
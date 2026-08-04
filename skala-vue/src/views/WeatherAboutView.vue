<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()
const handleGoHome = () => {
    router.push('/')
}

</script>

<template>
    <div class="container">
        <h3>ℹ️ 서비스 소개</h3>
        <hr style="border:none; height:1px; background-color:lightgrey;" />
        <p>본 앱은 Vue 3 및 Vue Router 기반으로 제작된 실습용 기상 관측 대시보드 시스템입니다.</p>
        <p>OpenWeather REST API를 이용하여 실시간 날씨 데이터를 불러옵니다.</p>
        <img src="../assets/450EE06E-218B-4E2D-A560-C5EBE47AA18B_1_105_c.jpeg" width="500px">
    </div>
    <button @click="handleGoHome">메인 대시보드로 돌아가기</button>
</template>

<style scoped>
.container {
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    margin: 10px 0 10px 0;
    padding: 20px;
    background-color: white;
}
p {
    margin: 10px;
}
button {
    border-radius: 4px;
    background-color: rgb(45, 45, 45);
    color: white;
    padding: 6px 10px;
    font-weight: 900;
    margin-top: 10px;
}
</style>
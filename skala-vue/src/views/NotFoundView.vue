<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const handleGoHome = () => {
    router.push('/')
}
</script>

<template>
    <div class="container">
        <p class="ques">❓</p>
        <p class="pageNotFound">페이지를 찾을 수 없습니다.</p>
        <p class="detail">요청하신 주소가 존재하지 않거나,</p>
        <p class="detail">아직 개발되지 않았습니다.</p>
        <button @click="handleGoHome">날씨 메인으로 이동</button>
    </div>
</template>

<style scoped>
.ques {
    font-size: 100px;
}
.pageNotFound {
    font-size: 35px;
    font-weight: 900;
}
.container {
    border: 1px solid rgb(231, 231, 231);
    text-align: center;
    border-radius: 10px;
    
}
button {
    margin: 40px;
    padding: 10px 15px;
    border-radius: 7px;
    border: none
}
</style>
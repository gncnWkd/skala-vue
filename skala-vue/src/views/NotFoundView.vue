<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const handleGoHome = () => {
    router.push('/')
}
</script>

<template>
    
    <el-result class="container" icon="warning" title="페이지를 찾을 수 없습니다" sub-title="요청하신 주소가 존재하지 않거나 아직 개발되지 않았습니다.">
        <template #extra>
            <img src="../assets/hoochoo.png"><br/>
            <el-button type="primary" @click="handleGoHome">날씨 메인으로 이동</el-button>
        </template>
    </el-result>
</template>

<style scoped>
.container {
    border: 1px solid var(--line);
    border-radius: 16px;
    background: var(--surface);
}
</style>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <section class="about-page">
    <el-button class="back-button" link @click="router.push('/')">← 대시보드로 돌아가기</el-button>
    <el-card class="about-card" shadow="never">
      <span class="about-icon">☀</span>
      <p class="eyebrow">ABOUT SEEWEATHER</p>
      <h1>날씨를 더 쉽고<br /><em>기분 좋게 확인하는 방법</em></h1>
      <p class="lead">
        날씨바바는 Vue 3와 Vue Router를 기반으로 만든 기상 관측 대시보드입니다. <br />주요 도시의
        실시간 날씨 정보를 단정한 화면에 담았습니다.
      </p>
      <img src="../assets/450EE06E-218B-4E2D-A560-C5EBE47AA18B_1_105_c.jpeg" width="500px" />
      <el-row class="feature-list" :gutter="12"
        ><el-col :xs="24" :sm="12"
          ><div>
            <span>⌁</span>
            <p><strong>실시간 관측</strong>OpenWeather 데이터를 바탕으로 업데이트됩니다.</p>
          </div></el-col
        ><el-col :xs="24" :sm="12"
          ><div>
            <span>◌</span>
            <p><strong>온도 단위 전환</strong>섭씨와 화씨를 바로 비교할 수 있습니다.</p>
          </div></el-col
        ></el-row
      >
    </el-card>
  </section>
</template>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 0 auto;
}
.back-button {
  margin-bottom: 22px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}
.about-card {
  border-color: var(--line);
  border-radius: 25px;
  box-shadow: var(--shadow);
}
.about-card :deep(.el-card__body) {
  padding: clamp(28px, 6vw, 58px);
}
.about-icon {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 17px;
  color: #fff;
  background: linear-gradient(135deg, #ffbc35, #ff7a3c);
  font-size: 27px;
}
.eyebrow {
  margin-top: 24px;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.13em;
}
.about-card h1 {
  margin-top: 8px;
  font-size: clamp(29px, 5vw, 42px);
  font-weight: 800;
  letter-spacing: -0.07em;
  line-height: 1.17;
}
.about-card h1 em {
  color: var(--primary);
  font-style: normal;
}
.lead {
  max-width: 560px;
  margin-top: 20px;
  color: var(--muted);
}
.feature-list {
  margin-top: 35px;
}
.feature-list > :deep(.el-col) > div {
  display: flex;
  gap: 10px;
  padding: 15px;
  border-radius: 14px;
  background: var(--surface-soft);
}
.feature-list span {
  display: grid;
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 9px;
  color: var(--primary);
  background: var(--sky);
}
.feature-list p {
  color: var(--muted);
  font-size: 12px;
}
.feature-list strong {
  display: block;
  margin-bottom: 2px;
  color: var(--ink);
  font-size: 13px;
}
@media (max-width: 560px) {
  .feature-list :deep(.el-col + .el-col) {
    margin-top: 12px;
  }
  .about-card {
    border-radius: 20px;
  }
}
</style>

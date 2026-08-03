<script setup>
</script>

<template>
    <div class="contents">
        <div class="dash-board">
            <slot></slot>
        </div>
    </div>
</template>


<style scoped>
    .dash-board{
        border: 1px solid #d7d7d7;
        border-radius: 10px;
        margin: 20px 0 20px 0;
        padding: 20px;
        background-color: #fbfbfb;
    }

</style>
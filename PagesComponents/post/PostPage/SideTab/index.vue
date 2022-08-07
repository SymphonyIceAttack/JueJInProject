<script setup lang="ts"></script>
<template>
    <div class="SideTab">
        <slot />
    </div>
</template>

<style lang="less" scoped>
.SideTab {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30vw;
    position: relative;
    // 这里100%的原因是，整个盒子的高度是有左侧子盒子的决定的
    height: 100%;
    border: 1px solid yellowgreen;
}
</style>

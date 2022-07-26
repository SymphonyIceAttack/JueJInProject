<script lang="ts" setup></script>

<template>
    <ul class="rightSideBar">
        <slot />
    </ul>
</template>
<style lang="less" scoped>
.rightSideBar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    order: 0;
}
</style>

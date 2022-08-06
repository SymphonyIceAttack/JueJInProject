<script setup lang="ts">
const isNavBarHide = useNavBarHide();
</script>
<template>
    <div class="IndexPageContainter" :class="{ NavBarMoveTop: isNavBarHide }">
        <slot />
    </div>
</template>

<style lang="less" scoped>
.IndexPageContainter {
    height: calc(100% + 2rem);
    width: 80%;
    margin: 1rem auto;
    display: flex;
    justify-content: space-between;
    transition: all 0.2s;
    background-color: white;
    box-shadow: 0 0 5px 5px white;
}
div.NavBarMoveTop {
    transform: translateY(-5rem);
    height: calc(100% + 7rem);
}
</style>

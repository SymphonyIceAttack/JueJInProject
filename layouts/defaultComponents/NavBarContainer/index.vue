<script lang="ts" setup></script>

<template>
    <div class="NavBarContainer">
        <img
            class="logoImg"
            src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
            alt=""
        />
        <nav class="navbar">
            <slot />
        </nav>
    </div>
</template>

<style lang="less" scoped>
.NavBarContainer {
    height: 5rem;
    position: sticky;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    .navbar {
        height: 100%;
        flex: 1 0 auto;
        display: flex;
        justify-content: space-between;
    }
    .logoImg {
        margin-right: 1rem;
        margin-left: 24px;
        display: block;
        width: 107px;
        height: 22px;
    }
}
</style>

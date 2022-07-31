<script lang="ts" setup>
import { useWindowScroll } from "@vueuse/core";
const { x, y } = useWindowScroll();
const isNavBarHide = useNavBarHide();
watch(y, () => {
   isNavBarHide.value = Boolean(y.value > 100);
});

</script>

<template>
    <div class="OuterBox">
        <div class="NavBarContainer" :class="{ NavBarHide: isNavBarHide }">
            <img
                class="logoImg"
                src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
                alt=""
            />
            <nav class="navbar">
                <slot />
            </nav>
        </div>
    </div>
</template>

<style lang="less" scoped>
.OuterBox {
    position: relative;
    height: 5rem;
}
.NavBarContainer {
    height: 5rem;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    transition: all 0.3s;
    z-index: 100;
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
.NavBarHide {
    transform: translateY(-5rem);
}
</style>

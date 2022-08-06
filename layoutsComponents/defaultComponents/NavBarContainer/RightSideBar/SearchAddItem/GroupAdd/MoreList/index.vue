<script setup lang="ts">
import MoreListItem from "./MoreListItem/index.vue";
import { nanoid } from "nanoid";
import type { MoreListItemType } from "@/ProjectTypes/MoreListItemType";
import { Ref } from "vue";
const props = defineProps<{
    isMoreListShowWarp: () => Ref<boolean>;
}>();
const isMoreListShow = props.isMoreListShowWarp();
const MoreList = ref<MoreListItemType[]>([
    {
        content: "写文章",
        src: "//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/a0c8073862f04c2925249fd397763fd3.svg",
    },
    {
        content: "发沸点",
        src: "//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e5381c85b5939d984a4b0c0edf102122.svg",
    },
    {
        content: "写代码",
        src: "//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/01c75d281edffa91cacfb93189c940b4.svg",
    },
]);
</script>
<template>
    <ul class="moreList" :class="{ moreListShow: isMoreListShow }">
        <MoreListItem v-for="item in MoreList" :item="item" :key="nanoid()" />
    </ul>
</template>

<style lang="less" scoped>
.moreList {
    position: absolute;
    top: 120%;
    left: -7px;
    right: 0;
    padding: 0.417rem 0;
    font-size: 1.167rem;
    z-index: 1;
    box-shadow: 0 0 24px rgba(81, 87, 103, 0.16);
    border-radius: 6px;
    width: 10rem;
    height: 106px;
    background-color: white;
    display: none;
}

.moreListShow {
    display: block;
}
</style>

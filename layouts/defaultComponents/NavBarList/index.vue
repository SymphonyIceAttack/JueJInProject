<script lang="ts" setup>
import { nanoid } from "nanoid";
import type { LinkItemType } from "./Type";
import NavLinkItem from "./NavLinkItem/index.vue";
const LinkItem = reactive<LinkItemType[]>([
    { name: "首页", to: "/" },
    { name: "沸点", to: "/about" },
    { name: "课程", to: "/home" },
    { name: "直播", to: "/1" },
    { name: "资讯", to: "/2" },
    { name: "活动", to: "/3" },
    { name: "商城", to: "/4" },
]);
</script>

<template>
    <ul class="ulList">
        <NavLinkItem
            v-for="item in LinkItem"
            key="nanoid()"
            :name="item.name"
            :to="item.to"
        />
    </ul>
</template>
<style lang="less" scoped>
.ulList {
    display: flex;
    align-items: center;
    height: 100%;
}
</style>

<script lang="ts" setup>
import { nanoid } from "nanoid";

import NavLinkItem from "./NavLinkItem/index.vue";
const LinkItem = useRouterArrayAll();
</script>

<template>
    <ul class="ulList">
        <NavLinkItem
            v-for="item in LinkItem"
            key="nanoid()"
            :name="item.name"
            :to="item.to"
            :isOuter="item.isOuter"
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

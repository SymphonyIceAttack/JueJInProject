<script lang="ts" setup>
import { AddressType } from "@/ProjectTypes/AddressType";
const props = defineProps<{
    name: string;
    to: AddressType;
}>();
</script>

<template>
    <li class="LinkItem">
        <NuxtLink exactActiveClass="MYexactActiveClass" :to="to">{{
            name
        }}</NuxtLink>
    </li>
</template>
<style lang="less" scoped>
.LinkItem {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s;
    cursor: pointer;
    a {
        display: inline-block;
        height: 5rem;
        margin: 0 1rem;
        line-height: 5rem;
        font-size: 1.167rem;
        &:hover {
            border-bottom: 2px blue solid;
        }
    }
}
.MYexactActiveClass {
    color: #1e80ff;
    font-weight: 500;
}
</style>

<script lang="ts" setup>
import {
    LinkItemPathTypeOrigin,
    LinkItemTypeNameOrigin,
} from "@/ProjectTypes/RouterType";
const props = defineProps<{
    name: LinkItemTypeNameOrigin;
    to: LinkItemPathTypeOrigin;
    isOuter: boolean;
}>();

const currentPathArray = useDynamicRouterArr();

const LinkActiveClass = useWhichActiveClass();

function ClickItem() {
    currentPathArray.value = useReducerDynamic(props.to);
    LinkActiveClass.value = props.to;
}
</script>

<template>
    <li class="LinkItem">
        <NuxtLink
            v-if="!isOuter"
            :to="to"
            @click="ClickItem()"
            :class="{ LinkActiveClass: LinkActiveClass == to }"
            >{{ name }}</NuxtLink
        >
        <a v-else :href="to">{{ name }}</a>
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
    a.router-link-active {
        color: #1e80ff;
        font-weight: 500;
    }
    .LinkActiveClass {
        color: #1e80ff;
        font-weight: 500;
    }
}
</style>

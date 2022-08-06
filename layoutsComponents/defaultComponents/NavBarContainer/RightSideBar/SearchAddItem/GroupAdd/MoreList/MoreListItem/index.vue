<script setup lang="ts">
import type { MoreListItemType } from "@/ProjectTypes/MoreListItemType";
defineProps<{
    item: MoreListItemType;
}>();
</script>
<template>
    <li class="MoreListItem">
        <img :src="item.src" alt="" />
        <span>
            {{ item.content }}
        </span>
    </li>
</template>

<style lang="less" scoped>
li.MoreListItem {
    margin: 0 8px;
    padding: 6px 5px 5px 0.8rem;
    border-radius: 4px;
    font-weight: 400;
    height: 2rem;
    text-align: center;
    display: flex;
    align-items: center;

    &:hover {
        background-color: whitesmoke;
    }
    img {
        width: 24px;
        height: 24px;
    }
    span {
        margin-left: 1rem;
        height: 2rem;
        line-height: 2rem;
    }
}
</style>

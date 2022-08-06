<script lang="ts" setup>
import { Ref } from "vue";
const props = defineProps<{
    isHiddenWrap: () => Ref<boolean>;
}>();
const isHidden = props.isHiddenWrap();
</script>

<template>
    <li class="SearchAddItem" :class="{ SearchAddItemHidden: isHidden }">
        <slot />
    </li>
</template>

<style lang="less" scoped>
.SearchAddItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 30rem;
    height: 100%;
    padding: 1rem 0;
}
.SearchAddItemHidden {
    overflow: hidden;
}
</style>

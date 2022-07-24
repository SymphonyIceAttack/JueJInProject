<script lang="ts" setup></script>

<template>
    <li class="SearchAddItem">
        <slot  />
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
    overflow: hidden;
}

</style>

<script setup lang="ts"></script>
<template>
    <div class="CommentModule">
        <slot />
    </div>
</template>

<style lang="less" scoped>
.CommentModule {
    box-sizing: border-box;
    width: 100%;
    height: 500px;
    background-color: white;
    padding: 2rem;
}
</style>

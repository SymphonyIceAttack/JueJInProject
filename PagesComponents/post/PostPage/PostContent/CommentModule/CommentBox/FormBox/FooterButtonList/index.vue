<script setup lang="ts">
const CommentState = useCommentState();
</script>
<template>
    <div
        class="FooterButtonList"
        v-show="CommentState.isFooterShow || CommentState.isInputText"
    >
        <slot />
    </div>
</template>

<style lang="less" scoped>
.FooterButtonList {
    display: flex;
    align-items: center;
    margin-top: 8px;
    padding-right: 8px;
}
</style>

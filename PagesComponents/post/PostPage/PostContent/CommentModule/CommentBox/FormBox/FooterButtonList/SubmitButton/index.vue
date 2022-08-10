<script setup lang="ts">
const CommentState = useCommentState();
</script>
<template>
    <div class="SubmitButton">
        <span> ⌘ + Enter </span>
        <button :class="{ ActiveButton: CommentState.isInputText }"
            >发表评论</button
        >
    </div>
</template>

<style lang="less" scoped>
.SubmitButton {
    flex: 0 0 auto;
    margin-left: auto;
    button {
        font: inherit;
        overflow: visible;
        text-transform: none;
        margin: initial;
        appearance: none;
        border: none;
        outline: none;
        transition: background-color 0.3s, color 0.3s;
        flex: 0 0 auto;
        margin-left: 2rem;
        width: 92px;
        text-align: center;
        font-size: 14px;
        line-height: 36px;
        border-radius: 4px;
        color: #fff;
        padding: 0;
        cursor: pointer;
        background: #abcdff;
    }
    button.ActiveButton {
        background: #2233ea;
    }
}
</style>

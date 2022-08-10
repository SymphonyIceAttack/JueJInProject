<script setup lang="ts">
const CommentState = useCommentState();
const TextValue = ref("");

watch(TextValue, (newValue, oldValue) => {
    newValue.length > 0
        ? (CommentState.value.isInputText = true)
        : (CommentState.value.isInputText = false);
});
</script>
<template>
    <div class="inputBox">
        <textarea
            v-model="TextValue"
            placeholder="输入评论(Enter换行,⌘ + Enter发送)"
            type="text"
            @focus="CommentState.isFooterShow = true"
            @blur="CommentState.isFooterShow = false"
            :class="{
                ActiveTextarea:
                    CommentState.isFooterShow || CommentState.isInputText,
            }"
        />
    </div>
</template>

<style lang="less" scoped>
.inputBox {
    width: 100%;
    padding: 8px 12px 8px 0px;
    box-sizing: border-box;
    textarea {
        box-sizing: border-box;
        border-radius: 5px;
        padding: 8px 8px;
        width: 100%;
        min-height: 64px;
        border: none;
        outline: none;
        resize: none;
        color: #252933;
        background-color: rgb(242, 243, 245);
        -webkit-user-select: auto; /*webkit浏览器*/
        user-select: auto;
        -o-user-select: auto;
        -ms-user-select: auto;
    }
    textarea.ActiveTextarea {
        background-color: white;
        box-shadow: 0 0 1px 1px rgba(0, 115, 255, 0.678);
    }
}
</style>

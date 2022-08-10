<script setup lang="ts">
defineProps<{
    data: {
        id: string;
        contentHtml: string;
    };
}>();
const HtmlDom = ref<HTMLDivElement>();
useMarkDownTransform(HtmlDom);
</script>
<template>
    <div
        class="markdownTransform"
        ref="HtmlDom"
        v-html="data.contentHtml"
    ></div>
</template>

<style lang="less" scoped>
.markdownTransform {
    background-color: white;
}
</style>

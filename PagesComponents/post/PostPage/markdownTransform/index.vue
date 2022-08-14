<script setup lang="ts">
const props = defineProps<{
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

<style lang="less">
.markdownTransform {
    overflow: hidden;
    background-color: white;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    text-indent: 1em;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        word-break: break-word;
        line-height: 1.75;
        font-family: -apple-system, system-ui, BlinkMacSystemFont,
            Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
            Arial, sans-serif;
        color: #4dd0e1;
        margin: 30px 0;
        font-size: 18px;
        position: relative;
        padding: 4px 32px;
        width: max-content;
    }
    p {
        word-break: break-word;
        font-weight: 400;
        color: #2b2b2b;
        font-family: -apple-system, system-ui, BlinkMacSystemFont,
            Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
            Arial, sans-serif;
        line-height: inherit;
        margin: 22px 0;
        letter-spacing: 2px;
        font-size: 14px;
        padding: 4px 32px;
        word-spacing: 2px;
    }
    pre {
        word-break: break-word;
        font-weight: 400;
        font-size: 1em;
        font-family: Menlo, Monaco, Consolas, Courier New, monospace;
        overflow: auto;
        position: relative;
        line-height: 1.75;
        box-shadow: 0 0 8px hsla(0, 0%, 43.1%, 0.45);
        border-radius: 4px;
        margin: 16px;
        background: #2b2b2b;
        color: #bababa;
    }
    img {
        word-break: break-word;
        font-weight: 400;
        color: #2b2b2b;
        font-family: -apple-system, system-ui, BlinkMacSystemFont,
            Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
            Arial, sans-serif;
        line-height: inherit;
        letter-spacing: 2px;
        font-size: 14px;
        word-spacing: 2px;
        border-style: none;
        z-index: 10000;
        cursor: zoom-in;
        transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1) !important;
        border-radius: 6px;
        display: block;
        margin: 20px auto !important;
        object-fit: contain;
        box-shadow: 0 0 16px hsla(0, 0%, 43.1%, 0.45);
        max-width: 100% !important;
    }
    code {
        font-weight: 400;
        line-height: 1.75;
        -webkit-locale: "ini";
        border-radius: 2px;
        font-family: Menlo, Monaco, Consolas, Courier New, monospace;
        font-size: 12px;
        padding: 15px 12px;
        margin: 0;
        word-break: normal;
        display: block;
        overflow-x: auto;
        color: #333;
        background: #f8f8f8;
    }
    ul {
        word-break: break-word;
        font-weight: 400;
        font-size: 1em;
        font-family: Menlo, Monaco, Consolas, Courier New, monospace;
        overflow: auto;
        position: relative;
        line-height: 1.75;
        box-shadow: 0 0 8px hsla(0, 0%, 43.1%, 0.45);
        border-radius: 4px;
        margin: 16px;
        background: #2b2b2b;
        color: #bababa;
    }
}
</style>

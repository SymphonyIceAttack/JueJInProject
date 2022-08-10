<script setup lang="ts">
import PostPage from "@/PagesComponents/post/PostPage/index.vue";
import markdownTransform from "@/PagesComponents/post/PostPage/markdownTransform/index.vue";
const HtmlDom = ref<HTMLDivElement>();
const { data } = await useAsyncData(
    "getPostData",
    (): Promise<{
        id: string;
        contentHtml: string;
    }> => getPostData("ssg-ssr")
);
</script>
<template>
    <div class="PostContainer">
        <PostPage>
            <markdownTransform :data="data" />
        </PostPage>
    </div>
</template>

<style lang="less" scoped>
.PostContainer {
    display: flex;
}
</style>

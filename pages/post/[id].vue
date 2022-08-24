<script setup lang="ts">
import PostPage from "@/PagesComponents/post/PostPage/index.vue";
import markdownTransform from "@/PagesComponents/post/PostPage/markdownTransform/index.vue";
const route = useRoute();
const { data } = await useAsyncData(
    "getPostData",
    (
        NuxtApp
    ): Promise<{
        id: string;
        contentHtml: string;
    }> => {
        NuxtApp?.ssrContext?.noSSR === undefined && location.reload();
        return getPostData(route.params.id as string);
    }
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

<script lang="ts" setup>
import IndexPageContainter from "@/PagesComponents/index/indexComponents/IndexPageContainter/index.vue";
import IndexPageList from "@/PagesComponents/index/indexComponents/IndexPageContainter/IndexPageList/index.vue";
const AllPostId = await useAsyncData("AllPostId", (NuxtApp) => {
    NuxtApp?.ssrContext?.noSSR === undefined && location.reload();
    return getAllPostIds();
});
</script>

<template>
    <div class="IndexPage">
        <IndexPageContainter
            ><IndexPageList :AllPostId="AllPostId.data.value" />
        </IndexPageContainter>
    </div>
</template>

<style lang="less" scoped>
.IndexPage {
    height: 80vh;
}
</style>

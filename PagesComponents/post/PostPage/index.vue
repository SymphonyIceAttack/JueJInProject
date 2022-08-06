<script setup lang="ts">
import { nanoid } from "nanoid";
import type { DirectoryItemProps } from "~~/ProjectTypes/DirectoryTypes";
const DirectoryArrItem = ref<
    {
        itemProps: DirectoryItemProps;
        pageContent: string;
    }[]
>([
    {
        itemProps: {
            content: "我是目录的内容1",
            type: "origin",
        },
        pageContent: "我是页面的内容1",
    },
    {
        itemProps: {
            content: "我是目录的内容2",
            type: "origin",
        },
        pageContent: "我是页面的内容2",
    },
    {
        itemProps: {
            content: "我是目录的内容3",
            type: "origin",
        },
        pageContent: "我是页面的内容3",
    },
    {
        itemProps: {
            content: "我是目录的内容4",
            type: "origin",
        },
        pageContent: "我是页面的内容4",
    },
    {
        itemProps: {
            content: "我是目录的内容5",
            type: "origin",
        },
        pageContent: "我是页面的内容5",
    },
    {
        itemProps: {
            content: "我是目录的内容6",
            type: "origin",
        },
        pageContent: "我是页面的内容6",
    },
]);
</script>
<template>
    <div class="Post">
        <div class="Content">
            <div
                class="ContentDirectory"
                v-for="item in DirectoryArrItem"
                :key="nanoid()"
            >
                <DirectoryOuterItem :item="item.itemProps">
                    {{ item.pageContent }}
                </DirectoryOuterItem>
            </div>
        </div>
        <div class="SideTab">
            <DirectorySelfList />
        </div>
    </div>
</template>

<style lang="less" scoped>
.Post {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    .Content {
        width: 50vw;
        border: 1px solid yellowgreen;
        .ContentDirectory {
            height: 500px;
        }
    }
    .SideTab {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30vw;
        position: relative;
        // 这里100%的原因是，整个盒子的高度是有左侧子盒子的决定的
        height: 100%;
        border: 1px solid yellowgreen;
    }
}
</style>

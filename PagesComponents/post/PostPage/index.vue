<script setup lang="ts">
import PostContent from "./PostContent/index.vue";
import ContentDirectory from "./PostContent/ContentDirectory/index.vue";
import CommentModule from "./PostContent/CommentModule/index.vue";
import CommentHeader from "./PostContent/CommentModule/CommentHeader/index.vue";
import CommentBox from "./PostContent/CommentModule/CommentBox/index.vue";
import AvatarBox from "./PostContent/CommentModule/CommentBox/AvatarBox/index.vue";
import FormBox from "./PostContent/CommentModule/CommentBox/FormBox/index.vue";
import inputBox from "./PostContent/CommentModule/CommentBox/FormBox/inputBox/index.vue";
import FooterButtonList from "./PostContent/CommentModule/CommentBox/FormBox/FooterButtonList/index.vue";
import emojiBox from "./PostContent/CommentModule/CommentBox/FormBox/FooterButtonList/emojiBox/index.vue";
import ImageBox from "./PostContent/CommentModule/CommentBox/FormBox/FooterButtonList/ImageBox/index.vue";
import SubmitButton from "./PostContent/CommentModule/CommentBox/FormBox/FooterButtonList/SubmitButton/index.vue";


import SideTab from "./SideTab/index.vue";
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
        <PostContent>
            <ContentDirectory v-for="item in DirectoryArrItem" :key="nanoid()">
                <DirectoryOuterItem :item="item.itemProps">
                    {{ item.pageContent }}
                </DirectoryOuterItem>
            </ContentDirectory>

            <CommentModule>
                <CommentHeader />
                <CommentBox>
                    <AvatarBox />
                    <FormBox>
                        <inputBox />
                        <FooterButtonList>
                            <emojiBox /><ImageBox />
                            <SubmitButton />
                        </FooterButtonList>
                    </FormBox>
                </CommentBox>
            </CommentModule>
        </PostContent>

        <SideTab>
            <DirectorySelfList />
        </SideTab>
    </div>
</template>

<style lang="less" scoped>
.Post {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
}
</style>

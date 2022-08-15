<script setup lang="ts">
import PostContent from "./PostContent/index.vue";
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
</script>
<template>
    <div class="Post">
        <PostContent>
            <slot />

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

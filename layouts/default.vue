<script lang="ts" setup>
import NavBarContainer from "@navBarLayout/index.vue";
import NavBarList from "@navBarLayout/NavBarList/index.vue";
import RightSideBar from "@navBarLayout/RightSideBar/index.vue";
import SearchAddItem from "@navBarLayout/RightSideBar/SearchAddItem/index.vue";
import SrearchBox from "@navBarLayout/RightSideBar/SearchAddItem/SrearchBox/index.vue";
import GroupAdd from "@navBarLayout/RightSideBar/SearchAddItem/GroupAdd/index.vue";
import VipBox from "@navBarLayout/RightSideBar/VipBox/index.vue";
import NotifyMessage from "@navBarLayout/RightSideBar/NotifyMessage/index.vue";
import AvatarBox from "@navBarLayout/RightSideBar/AvatarBox/index.vue";

const isNavBarHide = useNavBarHide();
const route = useRoute();
watch(route, () => {
    isNavBarHide.value = false;
});
const isFoucsActive = ref(false);
// 这里之所以包一层，是因为ref传入模版中会自动脱钩，所以传入的值会变为一个单纯的布尔值
//为什么不直接返回ref，只因为闭包会导致每次调用后都会返回一个新的ref
const isFoucsActiveWrap = () => isFoucsActive;

</script>
<!--这里我使用了大量的插槽，是为了避免出现变量传递出现太大的层级深度
这里我抽离组件的依据是关注点分离，按照层级嵌套关系放置组件的位置固然可以
但我认为按照组件的显示的视图位置来确定层级更好 -->
<template>
    <div>
        <NavBarContainer>
            <NavBarList />
            <RightSideBar>
                <SearchAddItem :isHiddenWrap="isFoucsActiveWrap">
                    <SrearchBox :isFoucsActiveWrap="isFoucsActiveWrap" />
                    <GroupAdd :isHideWarp="isFoucsActiveWrap" />
                </SearchAddItem>
                <VipBox />
                <NotifyMessage />
                <AvatarBox />
            </RightSideBar>
        </NavBarContainer>
        <NavPageBar />
        <!--    路由出口 -->
        <slot />
    </div>
</template>

<style lang="less" scoped></style>

<script lang="ts" setup>
import NavBarContainer from "./defaultComponents/NavBarContainer/index.vue";
import NavBarList from "./defaultComponents/NavBarList/index.vue";
import RightSideBar from "./defaultComponents/RightSideBar/index.vue";
import SearchAddItem from "./defaultComponents/SearchAddItem/index.vue";
import SrearchBox from "./defaultComponents/SrearchBox/index.vue";
import GroupAdd from "./defaultComponents/GroupAdd/index.vue";
import VipBox from "./defaultComponents/VipBox/index.vue";
import NotifyMessage from "./defaultComponents/NotifyMessage/index.vue";
import AvatarBox from "./defaultComponents/AvatarBox/index.vue";
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
                <SearchAddItem>
                    <SrearchBox :isFoucsActiveWrap="isFoucsActiveWrap" />
                    <GroupAdd :isHideWarp="isFoucsActiveWrap" />
                </SearchAddItem>
                <VipBox />
                <NotifyMessage />
                <AvatarBox />
            </RightSideBar>
        </NavBarContainer>
        <NuxtPage />
    </div>
</template>

<style lang="less" scoped></style>

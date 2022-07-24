<script lang="ts" setup>
import { Ref } from "vue";
const props = defineProps<{
    isFoucsActiveWrap: () => Ref<boolean>;
}>();

const isFoucsActive = props.isFoucsActiveWrap();
</script>

<template>
    <div class="SearchBox" :class="{ isFoucsActiveClass: isFoucsActive }">
        <input
            type="text"
            @focus="isFoucsActive = true"
            @blur="isFoucsActive = false"
        />
        <div>
            <img
                src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/1e8ab9a22f0ddc36349f60b38900d0bd.svg"
                alt=""
            />
        </div>
    </div>
</template>
<style lang="less" scoped>
.SearchBox {
    overflow: hidden;
    display: flex;
    height: 2.834rem;
    color: #86909c;
    font-size: 1.167rem;
    align-items: center;
    position: relative;
    border: 1px solid #c2c8d1;
    border-radius: 4px;
    width: 180px;
    margin-right: 1rem;
    transition: width 0.3s;
    &:hover {
        border: 1px solid rgb(58, 9, 24);
    }
    input {
        border: none;
        width: calc(100% - 44px);
        padding: 0.6rem 0 0.6rem 1rem;
        box-shadow: none;
        outline: none;
        font-size: 1.1rem;
        color: #8a919f;
        background-color: transparent;
        transition: width 0.3s;
    }
    div {
        position: relative;
        left: -2px;
        width: 44px;
        height: 30px;
        border-radius: 2px;
        background-color: rgb(242, 243, 245);

        img {
            border-style: none;
            display: inline-block;
            width: 1.33rem;
            padding: 0 0.8333rem 0 0;
            cursor: pointer;
            margin: 7px 15px;
        }
    }
}
.isFoucsActiveClass {
    width: 27rem;
    border:1px solid #1e80ff !important;
}
</style>

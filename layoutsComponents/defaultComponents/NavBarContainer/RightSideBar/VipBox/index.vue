<script lang="ts" setup></script>

<template>
    <li class="VipBox">
        <div class="VipWrap">
            <img
                src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/24127194d5b158d7eaf8f09a256c5d01.svg"
                alt=""
            />
            <div class="vip-words">会员</div>
        </div>
    </li>
</template>
<style lang="less" scoped>
.VipBox {
    color: #86909c;
    padding: 0 1rem;
    font-size: 1.167rem;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .VipWrap {
        display: flex;
        align-items: center;
        img {
            width: 24px;
            height: 24px;
            border: none;
        }
        .vip-words {
            color: #86909c;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            margin-left: 4px;
            white-space:nowrap ;
        }
    }
}
</style>

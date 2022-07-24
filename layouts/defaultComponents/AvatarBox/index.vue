<script lang="ts" setup></script>

<template>
    <li class="AvatarBox">
        <img
            src="https://p3-passport.byteacctimg.com/img/user-avatar/b86a8eb966aaee60df3271a506d21b52~300x300.image"
            alt="幻彩冰袭的头像"
            data-src="https://p3-passport.byteacctimg.com/img/user-avatar/b86a8eb966aaee60df3271a506d21b52~300x300.image"
            loading="lazy"
        />
    </li>
</template>

<style lang="less" scoped>
.AvatarBox {
    padding: 0 1rem;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
        display: inline-block;
        background-position: 50%;
        background-repeat: no-repeat;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
    }
}
</style>

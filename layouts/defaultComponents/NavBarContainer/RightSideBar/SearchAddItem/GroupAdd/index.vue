<script lang="ts" setup>
import { Ref } from "vue";

const props = defineProps<{
    isHideWarp: () => Ref<boolean>;
}>();
const isHide = props.isHideWarp();
</script>

<template>
    <div class="GruopAdd" :class="{ HideClass: isHide }">
        <button class="GruopAddBtn">创作者中心</button>
        <div class="GruopAddMore">
            <svg
                data-v-b569322c=""
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="unfold12-icon"
            >
                <path
                    data-v-b569322c=""
                    d="M2.45025 4.82383C2.17422 4.49908 2.40501 4 2.83122 4H9.16878C9.59499 4 9.82578 4.49908 9.54975 4.82382L6.38097 8.5518C6.1813 8.7867 5.8187 8.7867 5.61903 8.5518L2.45025 4.82383Z"
                    fill="white"
                ></path>
            </svg>
        </div>
    </div>
</template>

<style lang="less" scoped>
.GruopAdd {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    width: 11rem;
    height: 3rem;
    overflow: hidden;
    // border: 1px solid black;
    transition: width 0.3s;
    .GruopAddBtn {
        padding: 0 1rem;
        font-size: 1.167rem;
        border-radius: 3px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        white-space: nowrap;
        height: 100%;
        color: white;
        cursor: pointer;
        border: none;
        background-color: rgb(31, 128, 255);
        &:hover {
            background-color: rgb(22, 99, 199);
        }
    }
    .GruopAddMore {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.667rem;
        height: 100%;
        border-left: 0.9px solid hsla(0, 0%, 100%, 0.1);
        border-radius: 3px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        box-sizing: border-box;
        color: white;
        background-color: rgb(31, 128, 255);
        &:hover {
            background-color: rgb(22, 99, 199);
        }
    }
}

.HideClass {
    width: 0;
    border: transparent;
}
</style>

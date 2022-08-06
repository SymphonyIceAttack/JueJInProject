<script setup lang="ts">
import type { indexPageItemType } from "@/ProjectTypes/indexPageItemType";
import { nanoid } from "nanoid";
import { useVirtualList, useIntersectionObserver } from "@vueuse/core";
import indexPageItem from "./indexPageItem/index.vue";
const ulBoxList = ref<HTMLUListElement>();
const isPosting = ref(false);
const targetBottomLi = ref<HTMLLIElement>();
const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(
    targetBottomLi,
    ([{ isIntersecting }], observerElement) => {
        targetIsVisible.value = isIntersecting;
    }
);
const createVirtualItem = (): indexPageItemType => ({
    name: "test",
    tags: ["tag1", "tag2"],
    title: "title",
    day: new Date(),
    Describe: "Describe",
    actionList: {
        view: 22,
        like: 22,
        comment: 22,
    },
});
const ArrayList = ref(
    Array.from(Array(99).keys()).map((item) => createVirtualItem())
);
const { list, containerProps, wrapperProps } = useVirtualList(ArrayList, {
    itemHeight: 130,
});
const isNavBarHide = useNavBarHide();

watch(
    () => wrapperProps.value.style.marginTop,
    (newValue, oldValue) => {
        const newNumber = parseInt(newValue);
        const oldNumber = parseInt(oldValue);

        !isPosting.value && newNumber - oldNumber > 0
            ? (isNavBarHide.value = true)
            : (isNavBarHide.value = false);
    }
);
watch(targetIsVisible, async () => {
    if (targetIsVisible.value && isPosting.value === false) {
        isPosting.value = true;
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 1000);
        });

        ArrayList.value.push(
            ...Array.from(Array(50).keys()).map((item) => createVirtualItem())
        );
        isPosting.value = false;
    }
});
</script>
<template>
    <div class="container" v-bind="containerProps" style="">
        <ul ref="ulBoxList" v-bind="wrapperProps" class="wrapper">
            <indexPageItem
                v-for="item in list"
                :key="item.index"
                :height="130"
                :item="item.data"
            />
            <li ref="targetBottomLi" style="height: 130px"></li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.container {
    height: 90%;
    margin: auto;
    width: 80%;
    overflow: visible;
}
</style>

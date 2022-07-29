<script setup lang="ts">
import { useDirceortyStore } from "@/Piniastore/DirceortyStore";
import type { DirectoryItem } from "~~/ProjectTypes/DirectoryTypes";
import { useWindowScroll } from "@vueuse/core";
const isNavBarHide = useNavBarHide();
const DirceortyStore = useDirceortyStore();
const { x, y } = useWindowScroll();
const UlBoxel = ref<HTMLElement>();
const recentId = ref<string>("");
const compare = (obj1: DirectoryItem, obj2: DirectoryItem) => {
    const val1 = obj1.TopLength;
    const val2 = obj2.TopLength;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }
};

const getArrayIndex = (arr: DirectoryItem[], id: string) => {
    let i = arr.length;
    while (i--) {
        if (arr[i].id === id) {
            return i;
        }
    }
    return -1;
};

onUnmounted(() => {
    DirceortyStore.$reset();
});
onMounted(() => {
    recentId.value = DirceortyStore.value[0].id;
});
watch([x, y], () => {
    const ResultArr = DirceortyStore.value
        .filter((item) => item.TopLength > 0)
        .sort(compare);

    ResultArr.length !== 0
        ? (recentId.value = ResultArr[0].id)
        : (recentId.value =
              DirceortyStore.value[DirceortyStore.value.length - 1].id);
});
watch(recentId, (newValue, oldValue) => {
    const newIndex = getArrayIndex(DirceortyStore.value, newValue);

    const oldIndex = getArrayIndex(DirceortyStore.value, oldValue);

    newIndex - oldIndex > 0
        ? (UlBoxel.value!.scrollTop += 50)
        : (UlBoxel.value!.scrollTop -= 50);
});
</script>

<template>
    <div
        class="DirectorySelfListBox"
        :style="{ position: isNavBarHide ? 'fixed' : 'relative' }"
    >
        <div class="DirectorySelfListHeader"> 目录 </div>
        <div class="DirectorySelfListHr"> </div>
        <div class="DirectorySelfList">
            <ul ref="UlBoxel">
                <li
                    v-for="item in DirceortyStore.value"
                    key="item.id"
                    :class="{
                        ActiveDirectory: recentId == item.id,
                    }"
                >
                    {{ item.content }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="less" scoped>
.DirectorySelfListBox {
    top: 5rem;
    right: 20px;
    width: 300px;
    background-color: white;
    transition: all 0.2s;
    .DirectorySelfListHeader {
        font-weight: 500;
        padding: 1.333rem 0;
        margin: 0 1.667rem;
        font-size: 16px;
        line-height: 2rem;
        color: #1d2129;
        border-bottom: 1px solid #e4e6eb;
    }
    .DirectorySelfListHr {
        width: 90%;
        margin: 0 auto;
        overflow: hidden;
        border: none;
        border-top: 1.5px solid #333;
    }
    .DirectorySelfList {
        background-color: white;
        transition: all 0.2s;
        ul {
            width: 100%;
            height: 500px;
            overflow: auto;
            li {
                height: 50px;
                line-height: 50px;
                pointer-events: auto;
                cursor: pointer;
                position: relative;
                z-index: 99;
            }
            li.ActiveDirectory {
                background-color: blue;
            }
        }
    }
}
</style>

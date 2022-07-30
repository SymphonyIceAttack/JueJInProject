<script setup lang="ts">
import { useDirceortyStore } from "@/Piniastore/DirceortyStore";
import type { DirectoryItem } from "~~/ProjectTypes/DirectoryTypes";
import {
    useWindowScroll,
    TransitionPresets,
    useTransition,
} from "@vueuse/core";
const isNavBarHide = useNavBarHide();
const DirceortyStore = useDirceortyStore();
const { x, y } = useWindowScroll();
const UlBoxel = ref<HTMLElement>();
const recentId = ref<string>("");
const TopLengthScroll = ref<number>(0);
const isTransition = ref(false);
const TopLengthScrolloutput = useTransition(TopLengthScroll, {
    duration: 1000,
    transition: TransitionPresets.easeInQuad,
});
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
let timer: any = null;
const GoBackScroll = (TopLength: number) => {
    isTransition.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
        isTransition.value = false;
    }, 1200);
    TopLengthScroll.value =
        document.documentElement.scrollTop + TopLength - 100;
};

onUnmounted(() => {
    DirceortyStore.$reset();
});
onMounted(() => {
    document.documentElement.scrollTop = 0;
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

    UlBoxel.value!.scrollTop += 50 * (newIndex - oldIndex);
    !isTransition.value
        ? (TopLengthScroll.value =
              document.documentElement.scrollTop +
              DirceortyStore.value.find((item) => item.id == newValue)!
                  .TopLength)
        : null;
});

watch(TopLengthScrolloutput, (output) => {
    isTransition.value ? (document.documentElement.scrollTop = output) : null;
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
                    <div
                        @click="GoBackScroll(item.TopLength)"
                        :class="{ leaf: item.type == 'leaf' }"
                    >
                        {{ item.content }}
                    </div>
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
        margin-top: 1rem;
        background-color: white;
        transition: all 0.2s;
        ul {
            width: 100%;
            height: 500px;
            overflow: auto;
            li {
                height: 40px;
                margin: 0;
                padding-left: 2rem;
                padding-right: 1rem;
                font-size: 1.167rem;
                font-weight: 400;
                line-height: 40px;
                color: #333;
                list-style: none;
                div {
                    padding-left: 1rem;
                    height: 100%;
                    border-radius: 5px;
                    cursor: pointer;
                    &:hover {
                        background-color: rgb(227, 230, 234);
                    }
                }
                div.leaf {
                    padding-left: 2rem;
                }
            }
            li.ActiveDirectory {
                color: blue;
                border-left: 2px solid blueviolet;
            }
        }
    }
}
</style>

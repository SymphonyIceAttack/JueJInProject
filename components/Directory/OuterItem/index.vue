<script setup lang="ts">
import { useDirceortyStore } from "@/Piniastore/DirceortyStore";
import { nanoid } from "nanoid";
import { useElementBounding, useWindowScroll } from "@vueuse/core";
import type { DirectoryType } from "~~/ProjectTypes/DirectoryTypes";
const divRef = ref<HTMLDivElement>();
const DirceortyStore = useDirceortyStore();
const id = nanoid();
const props = defineProps<{
    content: string;
    type: DirectoryType;
}>();

const BoundingClientRect = useElementBounding(divRef);
const { x, y } = useWindowScroll();

onMounted(() => {
    DirceortyStore.pushNewItem({
        id: id,
        TopLength: BoundingClientRect.top.value,
        content: props.content,
        type: props.type,
    });
});
watch([x, y], () => {
    BoundingClientRect.update;
    DirceortyStore.updateItem(id, BoundingClientRect.top.value);
});
</script>

<template>
    <div ref="divRef">
        <slot />
    </div>
</template>

<style lang="less" scoped></style>

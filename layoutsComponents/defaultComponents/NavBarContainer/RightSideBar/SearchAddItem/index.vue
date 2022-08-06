<script lang="ts" setup>
import { Ref } from "vue";
const props = defineProps<{
    isHiddenWrap: () => Ref<boolean>;
}>();
const isHidden = props.isHiddenWrap();

const LaterHidden = ref(isHidden.value);

watch(isHidden, () => {
    !isHidden.value
        ? setTimeout(() => {
              LaterHidden.value = isHidden.value;
          }, 300)
        : (LaterHidden.value = isHidden.value);
});
</script>

<template>
    <li class="SearchAddItem" :class="{ SearchAddItemHidden: LaterHidden }">
        <slot />
    </li>
</template>

<style lang="less" scoped>
.SearchAddItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 30rem;
    height: 100%;
    padding: 1rem 0;
}
.SearchAddItemHidden {
    overflow: hidden;
}
</style>

<script lang="ts" setup>
import type { LinkItemPathTypeOrigin } from "~~/ProjectTypes/RouterType";
import { nanoid } from "nanoid";
const isNavBarHide = useNavBarHide();
const currentPathArray = useDynamicRouterArr();

</script>

<template>
    <div class="NavBarOuter" v-if="currentPathArray.length !== 0">
        <nav class="NavBarComponents" :class="{ NavBarMoveTop: isNavBarHide }">
            <ul class="NavBarComponentsContent">
                <NuxtLink
                    v-for="item in currentPathArray"
                    key="nanoid()"
                    :to="item.path"
                    exact-active-class="MYexactActiveClass"
                    exact
                >
                    {{ item.name }}
                </NuxtLink>
            </ul>
        </nav>
    </div>
</template>

<style lang="less" scoped>
.NavBarOuter {
    position: relative;
    height: 3.833rem;
    transition: all 0.2s;
    .NavBarComponents {
        position: fixed;
        width: 100%;
        height: 3.833rem;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
        transition: all 0.2s;
        background: white;
        top: 5.1rem;
        .NavBarComponentsContent {
            max-width: 960px;
            margin: 0 auto;
            height: 100%;
            background: white;
            display: flex;
            align-items: center;
            line-height: 1;
            &:first-child {
                padding-right: 1rem;
            }
            a {
                display: flex;
                align-items: center;
                height: 100%;
                padding: 0 1rem;
                font-size: 1.16rem;
                &:hover {
                    color: #1e80ff;
                }
            }
            a.MYexactActiveClass {
                color: #1e80ff;
                font-weight: 500;
            }
        }
    }
    nav.NavBarMoveTop {
        transform: translateY(-5rem);
    }
}
</style>

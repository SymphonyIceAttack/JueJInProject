<script setup lang="ts">
import type { indexPageItemType } from "@/ProjectTypes/indexPageItemType";
import { nanoid } from "nanoid";
const router = useRouter();
const props = defineProps<{
    height: number;
    item: indexPageItemType;
    AllPostId: {
        params: {
            id: string;
        };
    }[];
}>();
const AllPostId = props.AllPostId;
const randomRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
const currentPostId = computed(() => randomRange(0, AllPostId.length));
const dev = process.dev;
</script>
<template>
    <NuxtLink
        :style="{ height: height + 'px' }"
        class="ItemBox"
        :to="
            !dev
                ? 'http://www.huancaibingxi.online/' +
                  'post/' +
                  AllPostId[currentPostId].params.id
                : '' + '/post/' + AllPostId[currentPostId].params.id
        "
        target="_blank"
    >
        <div class="MainItem">
            <div class="ItemHeader">
                <a>{{ item.name }}</a>
                <span>{{ item.day.toDateString() }}</span>
                <div v-for="tag in item.tags" :key="nanoid()" class="tag">{{
                    tag
                }}</div>
            </div>
            <div class="TitleRow"> <a href=""> xxxxxxxxx </a> </div>
            <div class="Describe">{{ item.Describe }}</div>
            <ul class="actionList">
                <li class="view">
                    <i></i>
                    <span>{{ item.actionList.view }}</span>
                </li>
                <li class="like">
                    <i></i>
                    <span>{{ item.actionList.like }}</span>
                </li>
                <li class="comment">
                    <i></i>
                    <span>{{ item.actionList.comment }}</span>
                </li>
            </ul>
        </div>
        <div class="line"></div>
    </NuxtLink>
</template>

<style lang="less" scoped>
.ItemBox {
    padding: 0 2rem;
    position: relative;
    background-clip: content-box;
    cursor: pointer;
    display: block;
    &:hover {
        background-color: #f4f5f5;
    }
    .MainItem {
        height: 100%;
        padding: 1px 1rem;
        .ItemHeader {
            display: flex;
            align-items: center;
            word-break: break-word;
            height: 22px;
            margin: 1rem 0;
            a {
                display: flex;
                align-items: center;
                margin-right: 8px;
                max-width: 162px;
                font-size: 13px;
                line-height: 22px;
                height: 22px;
                color: rgb(78, 89, 105);
                white-space: nowrap;
                word-break: break-all;
                overflow: hidden;
                cursor: pointer;
                &:hover {
                    color: blueviolet;
                }
            }
            span {
                line-height: 18px;
                height: 18px;
                font-size: 10px;
                color: rgb(198, 202, 208);
                padding: 0 1rem;
                border-left: 1px solid rgb(198, 202, 208);
                border-right: 1px solid rgb(198, 202, 208);
                user-select: none;
            }
            .tag {
                line-height: 18px;
                height: 18px;
                font-size: 10px;
                color: rgb(198, 202, 208);
                padding: 0 1rem;
                border-right: 1px solid rgb(198, 202, 208);
                user-select: none;
            }
        }
        .TitleRow {
            display: flex;
            margin-bottom: 8px;
            height: 2rem;
            a {
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
                color: #1d2129;
                width: 100%;
                height: 100%;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
            }
        }
        .Describe {
            margin-bottom: 10px;
            font-size: 13px;
            line-height: 1.5rem;
            height: 1.5rem;
            color: #86909c;
        }
        .actionList {
            font-size: 13px;
            line-height: 1.5rem;
            height: 1.5rem;
            color: #86909c;
            display: flex;
            align-items: center;
            li {
                height: 100%;
                cursor: pointer;
                &:hover {
                    color: blueviolet;
                }
            }
            .view {
                display: flex;
                align-items: center;
                width: 35px;
                justify-content: space-between;
                i {
                    display: block;
                    width: 16px;
                    height: 16px;
                    background-size: 100%;
                    background-image: url(//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/view.1eda8fa.png);
                }
                span {
                    font-size: 13px;
                    line-height: 1.5rem;
                    height: 1.5rem;
                }
            }
            .like {
                margin-left: 0.5rem;
                display: flex;
                align-items: center;
                width: 35px;
                justify-content: space-between;
                i {
                    display: block;
                    width: 16px;
                    height: 16px;
                    background-size: 100%;
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ9SURBVHgB7VZNbtNQEP7GP7AkN8DcoJyA5gRNTwCR2kqsUm9YEKEaoZRl0hUSBLWcAHOCpjdIT1AfIewgTjzM+AccxwHXLRYS/STnvbyxZ743b34e8L+DcEMMhu+fERk7DLTAuAwRjjz3eVD1+xsROD75eARmr7AczDlsVyVhoCbeDt85mXHmqLtkbst0Ko9jk31aVU9tAgvYW7FxYNJ3D85eufuTOZtKYiZu3X4z/LBdRU9tAia4E0+YL7I1z+3OmPEpkWOrip7aBED0RAcb7K8KeBb/alD+LQIa+TI48kxfuAfTVSlVMlybgAafpN1RYgujopwIOzpGEhuogGuloTc8bd2j5TmS8/VfHu7t5uUaeCaRygORPaqi00JFJAVn2UuNa667xXfEeJZ+rePR+Kool7gIQg67+RpBJTvo5QMoZHPXxFLW8Tld2lhoUqMOfg/JlKjdT2Pnpwf0bDlx3worG1EnPlENF0m5OayO5+7NyjRLHXgMfCsNQhumrBviRfRAhnqyu0KAYXmpcX/BfKKekL+dvBIheOUddkuNK7QO6A43ycXDvolYr5OtGTnlD3VU41rVZLdfccvIipMYDdYINAHZZJyicgR+4wQ0hbVH6Px7RBeNE9BM0lGbVxorTRNImhcxf8mvNxcDafOywBM0TUCqqEa/I09QbF6NECDQdjKuN6hGCJSlX2MENqXfGgFKS6hlmA9wi7hvLJ/qWEy/DL96AfMlEXWkU/mD0XiCkjud7kRk56iOltwRYz3ShM7KXlhpx4PheBR3qxzS6zbSi0YtyOZe9919D38ioNC2vIDl6NyQC2bWtzWVomvf93gWwg7KXH+HfwY/AGsn+Lf3Dim6AAAAAElFTkSuQmCC);
                }
                span {
                    font-size: 13px;
                    line-height: 1.5rem;
                    height: 1.5rem;
                }
            }
            .comment {
                margin-left: 0.5rem;
                display: flex;
                align-items: center;
                width: 35px;
                justify-content: space-between;
                i {
                    display: block;
                    width: 16px;
                    height: 16px;
                    background-size: 100%;
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKRSURBVHgB7VZNbtpQEJ55BlR15RvUOUHTG5ATJD1BQ9NU6gq8JKiKoyrJ0u2qUmkFOUGaE5TegJwg7gnqLRh7MvMwwiDbYHCUDZ9kHph5M9+bN38AO+zwzEAoiEv3xz4v/KAFiK/0S6J/qPCBoui+Y38cFlC3HgHH7Zk1FTXZUIt/mivEPVY6GFFw4difPNiWwNW3X+dLhj1iA3JqProXq7EQ8TVoz4A1147OWfPkAjYhcO1+twirt7FSEexPiG4+26cDyMEXt1s3AI7Z+LsZ4TEFB1newBzjf2B6Gi8kaqwyvEpHFgmVtjmxcTgm401R44I2G0M2KjpEV5W9KbG0koC+8znrt47d8GFDCAk+gJCQwNyvwqS1LLNwBbHbHuQ7G99bJ4rXgY4LRPGqz4T2koda8EAERl2zIrory7hArlBnDmdSDSbHyf8WrwDVNHKV0YOyQdGNXhAPMwlgnHKjaHQPJUNBOEjamL9fhI7SMt0/Q3uu08wjoJGWLk+FZQKefLyEwIKSETcxwTCbANFfWQLAIygZCFifrjkEQq73WgixCaUziHWi+p1JIC65Hj/mpdt1oCQkq2u7+f4uk4BAGo8minguFQy2hFRXvlonqTuXgK5aRLqHc/m8vXK7LdgCE6hYskolTGtqqWnYsU+dmITJrnCvv/7sOXKSDVCBiScrJgeVBHInIokDuYqEsB5KQqgMl7uk1A4DwrpCkFLLExL0x1HAWfXCr2H4X2TOWh+wEAGB7pBQcRITzgwymvmxEilcVtp+cX1cfs20Drv2VKyDSVUPI4Ij3lRPEfFJclzXEvIQlXhioZ4QYaNjn/Q3IrAMiQmDA0wB+QGEflr/ENK6xXOXFS8QRQdFx/YdnhyP1D0hcwr1KvEAAAAASUVORK5CYII=);
                }
                span {
                    font-size: 13px;
                    line-height: 1.5rem;
                    height: 1.5rem;
                }
            }
        }
    }
    .line {
        width: calc(100% - 4rem);
        margin: 0 auto;
        height: 1px;
        background-color: #ced1d184;
        position: absolute;
        bottom: 0;
    }
}
</style>

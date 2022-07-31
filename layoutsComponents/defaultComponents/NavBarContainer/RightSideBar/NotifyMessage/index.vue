<script lang="ts" setup></script>

<template>
    <li class="NotifyMessage">
        <NuxtLink>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-v-b569322c=""
            >
                <path
                    d="M6.01132 10.2856C6.28115 6.54234 8.68619 4.28564 11.9999 4.28564C15.3136 4.28564 17.7186 6.54234 17.9885 10.2856C18.1219 12.1363 18.4093 13.708 19.9473 15.8848C20.1889 16.2267 19.953 16.7142 19.5343 16.7142H4.46546C4.04679 16.7142 3.81092 16.2267 4.05252 15.8848C5.59053 13.708 5.87793 12.1363 6.01132 10.2856Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    data-v-b569322c=""
                ></path>
                <path
                    d="M11.9573 3.21436V4.28578"
                    stroke-width="3"
                    stroke-linecap="round"
                    data-v-b569322c=""
                ></path>
                <path
                    d="M9.57495 18.8569C9.92795 19.8557 10.8804 20.5712 12.0001 20.5712C13.1197 20.5712 14.0722 19.8557 14.4252 18.8569H9.57495Z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    data-v-b569322c=""
                ></path>
            </svg>
        </NuxtLink>
    </li>
</template>

<style lang="less" scoped>
.NotifyMessage {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    background-color: white;
    a {
        cursor: pointer;
        svg {
            fill: #8a919f;
            stroke: #8a919f;
        }
    }
}
</style>

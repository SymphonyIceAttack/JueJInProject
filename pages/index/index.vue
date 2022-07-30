<script lang="ts" setup></script>

<template>
    <div class="IndexPage">
        <div>
            <DirectoryOuterItem type="origin" content="Test1">
                Test1
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="leaf" content="Test2">
                Test2
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="leaf" content="Test3">
                Test3
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="origin" content="Test4">
                Test4
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="leaf" content="Test5">
                Test5
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="origin" content="Test6">
                Test6
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="leaf" content="Test7">
                Test7
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="origin" content="Test8">
                Test8
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="leaf" content="Test9">
                Test9
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="origin" content="Test10">
                Test10
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="origin" content="Test11">
                Test11
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="leaf" content="Test12">
                Test12
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="origin" content="Test13">
                Test13
            </DirectoryOuterItem>
            <div class="Test"></div>
            <DirectoryOuterItem type="leaf" content="Test14">
                Test14
            </DirectoryOuterItem>
            <div class="Test"></div>
        </div>
        <div>
            <DirectorySelfList />
        </div>
    </div>
</template>

<style lang="less" scoped>
.IndexPage {
    display: flex;
    justify-content: space-between;
    height: 2500px;
    .Test {
        height: 400px;
        background-color: yellowgreen;
    }
}
</style>

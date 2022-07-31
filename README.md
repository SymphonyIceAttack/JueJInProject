

# yarn
yarn install

yarn dev

# 项目的大致介绍
## 使用的技术栈
1. nuxt3 基于vue的ssr服务端框架
2. vueUse 是一个vue的hook工具库
3. pinia 是一个vue的全局状态管理工具
4. postcss是一个自动补全css浏览器兼容属性的解析器
5. less是一个css的扩展语法，我一般只会用到嵌套语法

## 各个文件的作用
1. pages 在nuxt中会自动生成对应的路由页面，所以我们要把路由页面的组件放到别处(这里我创建了一个PagesComponents)最好是通过同名文件夹放置同名路由页面的形式放置组件，既在PagesComponents中创建同名的文件夹在其中放置对应的路由页面组件
2. layouts 是一个nuxt自带的布局系统，该文件夹下的vue文件会被解析为布局页面，在布局页面中可以指定路由出口，默认是default.vue为布局系统。(这里我图方便就将default需要的组件放置在layouts里面，虽然也会生成对应的布局系统，但只要不指定就就行)
3. components 在nuxt中会将所有的vue文件注册为全局组件
4. composables 在nuxt中会将所有的ts/js文件注册为全局函数,如果是默认导出则函数名称就是文件名称，如果是模块化导出，则函数名称就是模块名称
5. piniaStore 是我用来存放piniaStore实例的文件，需要的时候引入就可以，piniaStore只能在setup中使用，或者在外部的函数中调用，并将该函数在setup中调用(这块不理解的就去看下vuehooks的使用规则)
6. ProjectTypes 是我用来存放ts类型文件，里面放置着项目需要用的ts类型，需要时 使用import type {xxxx} from "文件"的形式引入

## 项目nuxt开发注意事项
1. pages的下的路由文件创建或者销毁后需要重新dev运行nuxt
2. 在nuxt中ref，useRouter，包括上面的全局组件和全局函数都是不需要引入的，还有wtach，computed，这些vue自带的hook都是不需要的，就算外部引入的hook函数库(例如vueUse)也是不需要的，可以直接使用,我在项目中已经配置好了vueUse
3. 在nuxt还有一个useState函数，该函数需要一个唯一的id和一个返回初始化数据的函数，返回一个全局的ref对象，所以对于单个不需要与其他变量联动的全局变量只需使用useState就足够了，一般都是用一个函数对useState进行封装返回 return useState("id",()=>initData) ,在setup中调用封装好的函数，当对其ref对象进行修改时，其他的与他相同id创建的ref也会发生修改
(参考我的composables中的封装的函数)

## 自定义组件使用说明components文件夹
### components/Directory
1. DirectoryOuterItem 是一个具有插槽的组件，插槽是为了更好的在开发侧提供自由程度这里写啥都行最终都会显示到页面上，有两个参数content为最终在目录中显示的内容，type则表示是大标题还是小标题( "origin" | "leaf")，这两个参数都和最终的展示效果无关
2. DirectorySelfList 是一个目录展示列表用到时候直接在组件中使用就行了



## 目前将要实现的功能
1. 首页功能下拉加载列表
2. 文章渲染功能

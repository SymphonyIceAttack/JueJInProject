import type {
    LinkItemPathTypeOrigin,
    SubSet,
} from "~~/ProjectTypes/RouterType";
import { Ref } from "vue";
const SubsetArrayIndex: SubSet[] = [
    {
        name: "综合",
        path: "/main",
    },
    {
        name: "关注",
        path: "/main/following",
    },
    {
        name: "后端",
        path: "/main/backend",
    },
    {
        name: "前端",
        path: "/main/frontend",
    },
    {
        name: "Android",
        path: "/main/android",
    },
    {
        name: "iOS",
        path: "/main/ios",
    },
    {
        name: "人工智能",
        path: "/main/ai",
    },
    {
        name: "开发工具",
        path: "/main/freebie",
    },
    {
        name: "代码人生",
        path: "/main/career",
    },
    {
        name: "阅读",
        path: "/main/article",
    },
];

const SubsetArrayCourse: SubSet[] = [
    {
        name: "综合",
        path: "/course",
    },
    {
        name: "关注",
        path: "/course/following",
    },
    {
        name: "后端",
        path: "/course/backend",
    },
    {
        name: "前端",
        path: "/course/frontend",
    },
    {
        name: "Android",
        path: "/course/android",
    },
    {
        name: "iOS",
        path: "/course/ios",
    },
    {
        name: "人工智能",
        path: "/course/ai",
    },
    {
        name: "开发工具",
        path: "/course/freebie",
    },
    {
        name: "代码人生",
        path: "/course/career",
    },
    {
        name: "阅读",
        path: "/course/article",
    },
];

const SubsetArrayNews: SubSet[] = [
    {
        name: "全部",
        path: "/news",
    },
    {
        name: "行业动态",
        path: "/news/category",
    },
    {
        name: "软件更新",
        path: "/news/category",
    },
    {
        name: "编程语言",
        path: "/news/category",
    },
];

const SubsetArrayEvents: SubSet[] = [
    {
        path: "/events/all",
        name: "全部",
    },
];


export const useReducerDynamic = (path: LinkItemPathTypeOrigin): SubSet[] => {
    switch (path) {
        case "/main":
            return SubsetArrayIndex;
        case "/course":
            return SubsetArrayCourse;
        case "/news":
            return SubsetArrayNews;
        case "/events/all":
            return SubsetArrayEvents;
        default:
            return [];
    }
};

export default (): Ref<SubSet[]> => {
    const initRouterarray = useState(
        "useDynamicRouterArr",
        () => SubsetArrayIndex
    );

    return initRouterarray;
};

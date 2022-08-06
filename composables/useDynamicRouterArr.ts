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
        path: "/following",
    },
    {
        name: "后端",
        path: "/backend",
    },
    {
        name: "前端",
        path: "/frontend",
    },
    {
        name: "Android",
        path: "/android",
    },
    {
        name: "iOS",
        path: "/ios",
    },
    {
        name: "人工智能",
        path: "/ai",
    },
    {
        name: "开发工具",
        path: "/freebie",
    },
    {
        name: "代码人生",
        path: "/career",
    },
    {
        name: "阅读",
        path: "/article",
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

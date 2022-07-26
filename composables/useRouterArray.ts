import type {
    LinkListType,
    LinkItemTypeNameOrigin,
    LinkItemPathTypeOrigin,
} from "@/ProjectTypes/RouterType";

export const useRouterArrayAll = () => {
    return useState("RouterArray", (): LinkListType[] => [
        { name: "首页", to: "/", isOuter: false, hasSubset: true },
        { name: "沸点", to: "/pins", isOuter: false, hasSubset: false },
        { name: "课程", to: "/course", isOuter: false, hasSubset: true },
        { name: "直播", to: "/live", isOuter: false, hasSubset: false },
        { name: "资讯", to: "/news", isOuter: false, hasSubset: true },
        { name: "活动", to: "/events/all", isOuter: false, hasSubset: true },
        {
            name: "商城",
            to: "https://detail.youzan.com/show/goods/newest?kdt_id=104340304",
            isOuter: true,
            hasSubset: false,
        },
    ]);
};

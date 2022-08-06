export type LinkItemPathTypeOrigin =
    | "/main"
    | "/pins"
    | "/course"
    | "/live"
    | "/news"
    | "/events/all"
    | "https://detail.youzan.com/show/goods/newest?kdt_id=104340304";

export type LinkItemTypeNameOrigin =
    | "首页"
    | "沸点"
    | "课程"
    | "直播"
    | "资讯"
    | "活动"
    | "商城";

export type LinkItemType<
    T extends LinkItemTypeNameOrigin,
    Q extends LinkItemPathTypeOrigin,
    Z extends boolean = false,
    D extends boolean = false
> = {
    name: T;
    to: Q;
    isOuter: Z;
    hasSubset: D;
};

export type LinkListType =
    | LinkItemType<"首页", "/main", false, true>
    | LinkItemType<"沸点", "/pins">
    | LinkItemType<"课程", "/course", false, true>
    | LinkItemType<"直播", "/live">
    | LinkItemType<"资讯", "/news", false, true>
    | LinkItemType<"活动", "/events/all", false, true>
    | LinkItemType<
          "商城",
          "https://detail.youzan.com/show/goods/newest?kdt_id=104340304",
          true
      >;

export type SubSet = {
    name: string;
    path: string;
};

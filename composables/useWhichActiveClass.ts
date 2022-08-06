import type { LinkItemPathTypeOrigin } from "@/ProjectTypes/RouterType";
export default () => {
    return useState<LinkItemPathTypeOrigin>("useWhichActiveClass", () => "/main");
};

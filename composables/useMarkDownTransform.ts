import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { Ref } from "vue";
import { nanoid } from "nanoid";
import type { DirectoryItem } from "~~/ProjectTypes/DirectoryTypes";
import { useDirceortyStore } from "@/Piniastore/DirceortyStore";
import { useWindowScroll } from "@vueuse/core";
export async function getSortedPostsData () {
    const postsDirectory = "public/posts";
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    });
    return allPostsData;
}

export async function getAllPostIds () {
    const postsDirectory = "public/posts";
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}
export async function getPostData (id: string) {
    const postsDirectory = "public/posts";
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .use(remarkGfm)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}

const distributeItem = (
    type: string,
    index: number,
    id: string,
    content: string,
    TopLength: number
) => {
    if (type !== "H") return null;
    const item: DirectoryItem = {
        content,
        id,
        type,
        index,
        TopLength,
    };
    return item;
};

export const useMarkDownTransform = (
    target: Ref<HTMLDivElement | undefined>
) => {
    const DirceortyStore = useDirceortyStore();
    const { x, y } = useWindowScroll();

    watch([x, y], () => {
        const children = target.value?.children!;
        for (const child of children) {
            const type = child.tagName[0];
            type === "H" &&
                DirceortyStore.updateItem(
                    child.getAttribute("id")!,
                    child.getBoundingClientRect().top
                );
        }
    });
    onMounted(() => {
        const children = target.value?.children!;
        for (const child of children) {
            const type = child.tagName[0];
            const index = parseInt(child.tagName[1]);
            const id = nanoid();
            child.setAttribute("id", id);
            const content = child.textContent!;
            const TopLength = child.getBoundingClientRect().top;
            const item = distributeItem(type, index, id, content, TopLength);
            item !== null && DirceortyStore.pushNewItem(item);
        }
    });
};

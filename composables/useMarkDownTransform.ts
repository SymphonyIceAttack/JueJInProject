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
export async function getSortedPostsData() {
    const postsDirectory = path.join(process.cwd(), "posts");
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
        };
    });
    // Sort posts by date
    return allPostsData;
}

export async function getAllPostIds() {
    const postsDirectory = path.join(process.cwd(), "posts");
    const fileNames = fs.readdirSync(postsDirectory);

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}
export async function getPostData(id: string) {
    const postsDirectory = path.join(process.cwd(), "posts");
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .use(remarkGfm)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
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

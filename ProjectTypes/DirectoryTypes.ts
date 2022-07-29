import { Ref } from "vue";

export type DirectoryType = "origin" | "leaf";

export type DirectoryItem = {
    content: string;
    id: string;
    TopLength: number;
    type: DirectoryType;
};

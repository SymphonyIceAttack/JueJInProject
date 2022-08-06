export type DirectoryType = "origin" | "leaf";

export type DirectoryItem = {
    content: string;
    id: string;
    TopLength: number;
    type: DirectoryType;
};

export type DirectoryItemProps = {
    content: string;
    type: DirectoryType;
};

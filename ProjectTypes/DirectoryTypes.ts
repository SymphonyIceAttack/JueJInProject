export type DirectoryType = string;

export type DirectoryItem = {
    content: string;
    id: string;
    TopLength: number;
    type: DirectoryType;
    index: number;
};

export type DirectoryItemProps = {
    content: string;
    type: DirectoryType;
};

export type indexPageItemType = {
    name: string;
    tags: string[];
    title: string;
    day: Date;
    Describe: string;
    actionList: {
        view: number;
        like: number;
        comment: number;
    };
};

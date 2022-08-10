import { defineStore } from "pinia";

import type { DirectoryItem } from "~~/ProjectTypes/DirectoryTypes";

type DirceortyState = {
    value: DirectoryItem[];
};
export const useDirceortyStore = defineStore("useDirceortyStore", {
    state: (): DirceortyState => {
        return {
            value: [],
        };
    },
    actions: {
        pushNewItem(item: DirectoryItem) {
            this.value.push(item);
            // if (this.value.length === 0) {
            //     this.value.push(item);
            //     return;
            // }
            // let n = 0;
            // while (
            //     n < this.value.length &&
            //     this.value[n].TopLength <= item.TopLength
            // ) {
            //     n += 1;
            // }
            // n === this.value.length
            //     ? this.value.push(item)
            //     : this.value.splice(n, 0, item);
        },
        updateItem(id: string, TopLength: number) {
            if (this.value.find((item) => id === item.id) !== undefined) {
                this.value.find((item) => id === item.id)!.TopLength =
                    TopLength;
            }
        },
    },
});

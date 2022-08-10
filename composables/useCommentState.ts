export const useCommentState = () => {
    return useState("useCommentState", () => ({
        isFooterShow: false,
        isInputText: false,
    }));
};

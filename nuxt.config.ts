import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildModules: ["@pinia/nuxt"],
    types: [
        "@pinia/nuxt",
    ],
    modules: [],
    typescript: {
        shim: false,
    },
    build: {
        postcss: {
            postcssOptions: require("./postcss.config.js"),
        },
    },
});

import { defineNuxtConfig } from "nuxt";
import path from "path";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildModules: ["@pinia/nuxt", "@vueuse/nuxt"],
    types: ["@pinia/nuxt"],
    alias: {
        "@navBarLayout": path.resolve(
            __dirname,
            "layouts/defaultComponents/NavBarContainer"
        ),
    },
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

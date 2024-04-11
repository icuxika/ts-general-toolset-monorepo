import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [
            vue(),
            Components({
                resolvers: [
                    (componentName) => {
                        if (componentName.match(/^(T[A-Z]|t-[a-z])/))
                            return {
                                name: componentName,
                                from: "@ts-general-toolset-monorepo/vue-components",
                            };
                    },
                ],
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    };
});

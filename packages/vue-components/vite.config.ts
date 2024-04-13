import vue from "@vitejs/plugin-vue";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log(command, "<--->", mode);

    // generate volar.d.ts
    const components = fs.readFileSync("./src/components/index.ts", "utf-8");
    const lines: string[] = [];
    Array.from(components.matchAll(/export \* from ".\/(.*)";/g)).forEach(
        (match) => {
            const componentDir = match[1];
            const componentIndex = fs.readFileSync(
                "./src/components/" + componentDir + "/index.ts",
                "utf-8"
            );
            Array.from(
                componentIndex.matchAll(
                    /export { default as T(.*) } from ".\/(.*)\.vue";/g
                )
            ).forEach((componentMatch) => {
                const component = componentMatch[1];
                const key = `T${component}`;
                const entry = `${key}: typeof import('@ts-general-toolset-monorepo/vue-components')['${key}'];`;
                lines.push(entry);
            });
        }
    );
    const volarDTS = `
declare module "vue" {
    export interface GlobalComponents {
        ${lines.join("\n        ")}
    }
}
export {}
`;
    fs.writeFileSync(
        path.resolve(process.cwd(), "volar.d.ts"),
        volarDTS,
        "utf-8"
    );

    return {
        plugins: [
            vue(),
            {
                name: "build types and styles",
                closeBundle: async () => {
                    exec("pnpm run build:types", (error) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                    exec("pnpm run build:style", (error) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                },
            },
        ],
        build: {
            cssCodeSplit: false,
            lib: {
                entry: path.resolve(__dirname, "src/index.ts"),
                name: "@ts-general-toolset-monorepo/vue-components",
                fileName: "index",
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: [
                    "vue",
                    ...Object.keys(
                        JSON.parse(fs.readFileSync("package.json", "utf8"))
                            .dependencies
                    ),
                ],
                output: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: "Vue",
                    },
                },
            },
        },
    };
});

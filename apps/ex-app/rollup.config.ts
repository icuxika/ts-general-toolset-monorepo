import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";

/**
 * @rollup/plugin-node-resolve 支持解析node_modules中的第三方依赖
 * @rollup/plugin-commonjs 将CommonJS模块转换为ES6模块
 */
const config: RollupOptions = {
    input: "index.ts",
    output: {
        dir: "dist",
        format: "es",
    },
    plugins: [typescript(), nodeResolve(), commonjs()],
};

export default config;

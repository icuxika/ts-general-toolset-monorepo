import typescript from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";

const config: RollupOptions = {
    input: "index.ts",
    output: {
        dir: "dist",
        format: "es",
    },
    plugins: [typescript()],
};

export default config;
